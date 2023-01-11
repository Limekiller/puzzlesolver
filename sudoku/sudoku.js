// Sudoku solver

/**
 * Check if a given puzzle is valid
 * @param puzzle array: The puzzle to check
 * @return bool: Whether the puzzle is valid or not
 */
const check = (puzzle) => {

    /**
     * Check every row in a puzzle
     * Return false if we encounter any nulls; otherwise, iterate through each row and subtract each value from 405 and check the remainder is 0
     * @param puzzle array: The puzzle to check
     * @return bool: If all the rows are valid or not
     */
    const checkRows = (puzzle) => {
        let checkNum = 405
        for (let row of puzzle) {
            for (let num of row) {
                if (num === null) {
                    return false
                }
                checkNum -= num
            }
        }
        return checkNum === 0
    }

    /**
     * Check a given 9-square in the puzzle
     * Given a starting x,y coordinate and ending x,y coordinate, iterate each square between them and make sure they add up to 45
     * @param puzzle array: The puzzle to check
     * @param boundingCoords array: The bounding coordinates to check like [[0, 0], [2, 2]]
     * @return bool: Is the square valid?
     */
    const checkBox = (puzzle, boundingCoords) => {
        // [[0, 0], [2, 2]]
        let checkNum = 45
        for (let i = boundingCoords[0][0]; i <= boundingCoords[1][0]; i++) {
            for (let j = boundingCoords[0][1]; j <= boundingCoords[1][1]; j++) {
                const cellVal = puzzle[i][j]
                if (cellVal === null) {
                    return false
                }
                checkNum -= cellVal
            }   
        }
        return checkNum === 0
    }

    /**
     * Check all the columns in the puzzle
     * @param puzzle array: The puzzle to check
     * @return bool: Are all the cols valid?
     */
    const checkCols = (puzzle) => {
        let checkNum = 405
        for (let i = 0; i <= 8; i++) {
            for (let row of puzzle) {
                if (row[i] === null) {
                    return false
                }
                checkNum -= row[i]
            }
        }
        return checkNum === 0
    }

    const boxCoords = [
        [[0, 0], [2, 2]],
        [[3, 0], [5, 2]],
        [[6, 0], [8, 2]],
        [[0, 3], [2, 5]],
        [[3, 3], [5, 5]],
        [[6, 3], [8, 5]],
        [[0, 6], [2, 8]],
        [[3, 6], [5, 8]],
        [[6, 6], [8, 8]]
    ]

    // Iterate our list of bounding 9-square coords and check if each square is avlid
    for (let coordSet of boxCoords) {
        if (!checkBox(puzzle, coordSet)) {
            return false
        }
    }

    return checkRows(puzzle) && checkCols(puzzle)
}

/**
 * Given an array of numbers, ensure that there are no duplicates after removing nulls
 * @param row array: The row (or other structure, as the case may be) to check
 * @return bool: Is the row valid?
 */
const checkRowPossible = (row) => {
    // After removing nulls, make sure there are no duplicates in row. 
    // We assume that values are between 1 and 9
    row = row.filter(i => i !== null)
    return new Set(row).size === row.length
}

/**
 * Given a column index and a puzzle, check that the column is valid
 * @param colNum int: The index of the column to check
 * @param puzzle array: The puzzle to check
 * @return bool: Is the col valid?
 */
const checkColPossible = (colNum, puzzle) => {
    // Just go through the column and create a list of numbers --
    // then we can reuse the row checker
    let colArray = []
    for (let row of puzzle) {
        colArray.push(row[colNum])
    }
    return checkRowPossible(colArray)
}

/**
 * Given a column index and row index ((x,y) coordinates, in other words) and a puzzle, check that the 9-square is valid
 * @param colNum int: The index of the column to check
 * @param rowNum int: The index of the row to check
 * @param puzzle array: The puzzle to check
 * @return bool: Is the 9-square valid?
 */
const checkBoxPossible = (colNum, rowNum, puzzle) => {
    // Given our current position, get the starting point by subtracting the modulus from the current index
    const x_start = colNum - (colNum % 3)
    const y_start = rowNum - (rowNum % 3)
    // Then get the ending point by adding 2 to these numbers
    const x_fin = x_start + 2
    const y_fin = y_start + 2

    const startCoords = [x_start, y_start]
    const finCoords = [x_fin, y_fin]

    // Iterate through each number in the 9-square between these coordinates and add to a list
    // We can again reuse the row checker here
    let boxVals = []
    for (let i = startCoords[0]; i <= finCoords[0]; i++) {
        for (let j = startCoords[1]; j <= finCoords[1]; j++) {
            boxVals.push(puzzle[i][j])
        }   
    }
    return checkRowPossible(boxVals)
}

/**
 * Solve a sudoku puzzle!
 * @param puzzle array: A 2D array representing the puzzle state
 * @return array: The solved puzzle state
 */
const findSolution = (puzzle) => {
    // We iterate through every blank square in the puzzle and try every possible value from 1-9
    for (let row in puzzle) {
        for (let num in puzzle[row]) {
            if (puzzle[row][num] === null) {

                for (let i = 1; i <= 9; i++) {
                    // After setting a value, check that it is actually valid for the row, column, and 9-square
                    puzzle[row][num] = i
                    if (!checkRowPossible(puzzle[row]) || !checkColPossible(num, puzzle) || !checkBoxPossible(num, row, puzzle)) {
                        continue
                    }

                    // If so, call recursively to go to the next square
                    findSolution(puzzle)

                    // If we get here, the puzzle is either solved or we hit a dead-end
                    // Check for the former, but if it's the latter, we go around again and try the next number in sequence
                    if (check(puzzle)) {
                        return puzzle
                    }
                }

                // If we get HERE, none of the numbers worked; something must be wrong behind us
                // Set this number back to null and return to move back up the stack
                puzzle[row][num] = null
                return
            }
        }
    }

    return puzzle
}