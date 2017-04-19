const allowedChars = new Set([ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]);
const expectedCount = 7;
const maximumTensDigit = '5';

/**
 * Determines the sequence of lotto numbers to pick from the given string of digits.
 *
 * @param {string} inputString The number string. Must consist of at least seven digits.
 *
 * @return {integer[]} A sequence of seven numbers between 1 and 59 that comprise the lotto pick
 */
exports.makePick = function(inputString) {
  if (inputString.length < expectedCount) {
    throw new Error('Input must contain at least ' + expectedCount + ' digits');
  }

  // In JavaScript the Set type is iterated in insertion order so that the order will always be predictable, like in an array; however, it
  // also automatically removes duplicate values by its very nature.
  let pickNumbers = new Set();
  let stagedChar = '';

  function addToPick(currentChar) {
    let numberToAdd = Number(stagedChar + currentChar);
    if (pickNumbers.has(numberToAdd)) {
      throw new Error('Input contains duplicate lotto numbers: ' + numberToAdd);
    } else {
      pickNumbers.add(numberToAdd);
      stagedChar = '';
    }
  }

  for (let i = 0; i < inputString.length; i++) {
    let currentChar = inputString[i];
    if (!allowedChars.has(currentChar)) {
      throw new Error('Input must be a sequence of digits');
    } else if (stagedChar) {
      // We now have enough digits to make a two-digit number to add to the pick
      addToPick(currentChar);
    } else if (currentChar === '0') {
      // Skip a zero digit when it would be the first digit of a new two-digit number
      continue;
    } else if (currentChar > maximumTensDigit) {
      // Because the maximum value is 59, if the first digit is 6, then it cannot be the start of a two digit number. Add it as a one-digit
      // number to the pick.
      addToPick(currentChar);
    } else if (inputString.length - i === expectedCount - pickNumbers.size) {
      // The number of characters remaining in the string is exactly equal to the number of remaining numbers that we must pick; therefore,
      // treat each remaining digit as its own one-digit number in the pick.
      addToPick(currentChar);
    } else {
      // The character is to be the first digit of a new two-digit number
      stagedChar = currentChar;
    }
  }

  if (pickNumbers.size < expectedCount) {
    throw new Error('Input does not contain enough numbers to make a valid lotto pick (' + expectedCount + ')');
  } else if (pickNumbers.size > expectedCount) {
    throw new Error('Input contains too many numbers to make a valid lotto pick (' + expectedCount + ')');
  }

  // This use of the spread operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
  // automatically expands the Set of numbers to an array
  return [...pickNumbers];
};

/**
 * Determines the sequences of lotto numbers to pick from the given array of strings.
 *
 * @param {string[]} inputStrings An array of input strings, where each consists of seven or more digits
 *
 * @return {Object} An object/hash that maps each valid input string to an array of numbers that are included in that pick. If an input
 *                  string is invalid, it will be excluded from this result.
 */
exports.makePicks = function(inputStrings) {
  let result = { };

  for (let i = 0; i < inputStrings.length; i++) {
    let inputString = inputStrings[i];
    try {
      result[inputString] = exports.makePick(inputString);
    } catch (ex) {
      console.log('Invalid input string ("' + inputString + '"): ' + ex.message);
    }
  }

  return result;
};
