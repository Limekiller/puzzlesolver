// New York Times "Spelling Bee" puzzle solver

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

const generateWords = (letters, word = '', words = new Set(), wordlist = null) => {
  /**
   * Given a set of letters, return all valid words that can be made, including duplicate letters, up to length 10
   * This is a recursive function that finds all combinations of letters that match an existing list of words.
   * Considering all possible combinations in general is far too inefficient; this way our problem space is reduced
   * to only valid English words, instead of all letter combinations.
   * @param Letters array: The letters to build words from
   * @param word string: The current word that we're building
   * @param words set: All the words we've found so far
   * @param wordlist array: A list of words to search in for valid matches
   * @return array:
   */
  if (!wordlist) {
    wordlist = dictionary
  }

  // check if any words in our wordlist start with the prefix we're working with
  // if not, forget about this path
  const potentialWords = searchWordlist(word, wordlist);
  if (!potentialWords.length) {
    return;
  }

  if (word.length >= 4) {
    if (potentialWords.includes(word)) {
      words.add(word);
    }
  }

  if (word.length >= 10) {
    return;
  }

  for (const letter of letters) {
    word += letter
    generateWords(letters, word, words, potentialWords);

    // after we've exhaused a path, remove the last letter of the current word
    // so we can explore from the parent node
    word = word.slice(0, -1);
  }

  return words;
}

const checkWords = (wordlist, mainLetter) => {
  /**
   * Given a list of words, return those that contain the "main" letter
   * @param wordlist array: An array of words
   * @param main_letter string: The letter to look for in each word
   * @retrun array: A list of words that contain the main_letter
   */
  let words = [];
  for (const word of wordlist) {
    if (word.includes(mainLetter)) {
      words.push(word);
    }
  }
  return words;
}

const solve = (letters, mainLetter) => {
    /**
     * Main solver function
     * @param letters: A string containing every letter to consider
     * @param mainLetter: The letter that must be in each word
     * @return array: The list of possible words
     */
    const allWords = generateWords(letters);
    const matchingWords = checkWords(allWords, mainLetter);
    const sortedMatchingWords = matchingWords.sort((a, b) => a.length - b.length);

    let validWords = []
    for (const word of sortedMatchingWords) {
      validWords.push(word)
    }

    return validWords
}
