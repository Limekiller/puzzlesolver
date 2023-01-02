// New York Times "Letter Boxed" puzzle solver

const searchWordlist = (prefix, wordlist) => {
    /**
     * Given a prefix and a list of words, return words that start with said prefix
     * @param prefix: The prefix to search for
     * @param wordlist: An array of words in which to search
     * @return array: An array of words that start with the given prefix
     */
    let matchedWords = [];
    for (const word of wordlist) {
        if (word.startsWith(prefix)) {
            matchedWords.push(word);
        }
    }
    return matchedWords;
}

const checkWords = (wordList, boxData) => {
    /**
     * Given a list of words and the letter relationships, check if all letters are used properly
     * @param wordList array: The list of words to check
     * @param boxData object: The letter relationships
     * @return bool: Whether or not the check passes
     */
    let letterList = new Set()
    for (const letter in boxData) {
        letterList.add(letter)
    }
    let foundLetters = new Set()
    for (const word of wordList) {
        for (const letter of word) {
            foundLetters.add(letter)
        }
    }

    return foundLetters.size === letterList.size
}

const generateWords = (letter, boxData, efficiency = 2, word = '', currWords = [], wordlist = null) => {
    /**
     * Given a set of letters, return all valid words that can be made, including duplicate letters, up to length 10
     * This is a recursive function that finds all combinations of letters that match an existing list of words.
     * Considering all possible combinations in general is far too inefficient; this way our problem space is reduced
     * to only valid English words, instead of all letter combinations.
     * @param letter string: The letter to start the chain with
     * @param boxData obj: A dictionary representing valid relationships between letters
     * @param efficiency int: How many words to try to find a solution in
     * @param word string: The current word we're building
     * @param currWords array: A list representing the current word chain
     * @param word string: The current word that we're building
     * @param wordlist array: A list of words to search in for valid matches
     * @return array: The final list of words
     */
    if (!wordlist) {
        wordlist = dictionary
    }

    // This int controls the number of words the program will try to find the solution in
    // If we're over that number, check if we have a solution. If not, get rid of the last word and continue trying
    if (currWords.length >= efficiency) {
        if (checkWords(currWords, boxData)) {
            return
        }
        currWords.pop()
        return
    }

    // check if any words in our wordlist start with the prefix we're working with
    // if not, forget about this path
    const potentialWords = searchWordlist(word, wordlist);
    if (!potentialWords.length) {
        return;
    }

    // If we have a sufficiently large word that's in the dictionary (and isn't already in the current word list).
    // add it and call the function again using the last letter
    if (word.length >= 4) {
        if (potentialWords.includes(word) && !currWords.includes(word)) {
            currWords.push(word)
            const lastLetter = word.slice(-1)
            generateWords(lastLetter, boxData, efficiency, '', currWords, dictionary)

            // If we get here, we either have a complete list, or that path didn't work out
            if (checkWords(currWords, boxData)) {
                return
            }
            if (currWords.slice(-1)[0] == word) {
                currWords.pop()
                return
            }
        }
    }

    for (const nextLetter of boxData[letter]) {
        if (!word) {
            word = letter
        }
        word += nextLetter
        generateWords(nextLetter, boxData, efficiency, word, currWords, potentialWords)
        word = word.slice(0, -1)
    }

    return currWords
}