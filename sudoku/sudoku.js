// Sudoku solver

const checkPuzzle = (puzzle) => {
    for (let row in puzzle) {
        for (let column in puzzle[row]) {
            if (puzzle[row][column] !== null) {
                const value = puzzle[row][column]
                puzzle[row][column] = null
                if (!check(row, column, value, puzzle)) {
                    return false
                }
                puzzle[row][column] = value
            }
        }
    }
    return true
}

/**
 * Check if a given puzzle is valid
 * @param puzzle array: The puzzle to check
 * @return bool: Whether the puzzle is valid or not
 */
const check = (x, y, num, puzzle) => {
    for (let i = 0; i < 9; i++) {
        if (puzzle[x][i] === num || puzzle[i][y] === num) {
            return false;
        }
    }

    let x0 = Math.floor(x / 3) * 3;
    let y0 = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (puzzle[x0 + i][y0 + j] === num) {
                return false;
            }
        }
    }

    return true;
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
                    // If this is a valid move, put in the number and make the recursive call
                    if (check(row, num, i, puzzle)) {
                        puzzle[row][num] = i
                        if (findSolution(puzzle)) {
                            return puzzle
                        }
                    }
                }

                // If we get here, that path didn't work out -- reset to null and return
                puzzle[row][num] = null
                return false
            }
        }
    }

    return puzzle
}