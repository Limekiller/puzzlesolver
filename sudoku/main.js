// Sudoku solver

const check = (puzzle) => {
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

    for (let coordSet of boxCoords) {
        if (!checkBox(puzzle, coordSet)) {
            return false
        }
    }

    return checkRows(puzzle) && checkCols(puzzle)
}

const checkRowPossible = (row) => {
    // After removing nulls, make sure there are no duplicates in row. 
    // We assume that values are between 1 and 9
    row = row.filter(i => i !== null)
    return new Set(row).size === row.length
}

const checkColPossible = (colNum, puzzle) => {
    let colArray = []
    for (let row of puzzle) {
        colArray.push(row[colNum])
    }
    return checkRowPossible(colArray)
}

const generateCombinations = (length, currString = "", combos = []) => {
    if (currString.length >= length) {
        combos.push(currString)
        return
    }

    for (let i = 1; i <= 9; i++) {
        if (currString.includes(i)) {
            continue
        }

        currString += i
        generateCombinations(length, currString, combos)
        currString = currString.slice(0, -1)
    }

    return combos
}

const findSolution = (puzzle) => {
    for (let row in puzzle) {
        for (let num in puzzle[row]) {
            if (puzzle[row][num] === null) {
                for (let i = 1; i <= 9; i++) {
                    puzzle[row][num] = i

                    if (!checkRowPossible(puzzle[row]) || !checkColPossible(num, puzzle)) {
                        continue
                    }

                    findSolution(puzzle)

                    if (check(puzzle)) {
                        return puzzle
                    }
                }
                puzzle[row][num] = null
                return
            }
        }
    }

    return puzzle
}

const puzzle = [
    [8, 9, null, 4, 5, null, null, null, null],
    [null, null, 1, 3, null, null, null, null, null],
    [null, null, null, 9, 7, null, 2, 6, 8],
    [null, 8, 3, 7, 4, null, null, null, 9],
    [2, null, 7, 6, null, null, 4, 8, null],
    [null, 6, null, 8, null, 3, null, null, 7],
    [null, 7, null, null, 8, 4, null, 9, 6],
    [5, 4, null, null, 9, null, 7, null, null],
    [6, null, null, null, null, 7, 8, null, 4]
]