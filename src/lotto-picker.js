const inputRegex = /^[1-9]+$/;
const expectedCount = 7;
const maximumTensDigit = '5';

/**
 * Determines the sequence of lotto numbers to pick from the given string of digits.
 *
 * @param {string} inputString The number string. Must consist of at least seven digits from 1 through 9.
 *
 * @return {integer[]} A sequence of seven numbers between 1 and 59 that comprise the lotto pick
 */
exports.makePick = function(inputString) {
  if (!inputRegex.test(inputString)) {
    throw new Error('inputString must be a sequence of digits 1 through 9');
  }
  if (inputString.length < expectedCount) {
    throw new Error('inputString must contain at least ' + expectedCount + ' digits');
  }

  // In JavaScript the Set type is iterated in insertion order so that the order will always be predictable, like in an array; however, it
  // also automatically removes duplicate values by its very nature.
  let pickNumbers = new Set();
  let stagedChar = '';

  function addToPick(currentChar) {
    // Because it's a Set, duplicates are automatically discarded
    pickNumbers.add(Number(stagedChar + currentChar));
    stagedChar = '';
  }

  for (let i = 0; i < inputString.length && pickNumbers.size < expectedCount; i++) {
    let currentChar = inputString[i];
    if (stagedChar) {
      // We now have enough digits to make a two-digit number to add to the pick
      addToPick(currentChar);
    } else if (currentChar > maximumTensDigit) {
      // Because the maximum value is 59, if the first digit is 6, then it cannot be the start of a two digit number. Add it as a one-digit
      // number to the pick.
      addToPick(currentChar);
    } else if (inputString.length - i === expectedCount - pickNumbers.size) {
      // The number of characters remaining in the string is exactly equal to the number of remaining numbers that we must pick; therefore,
      // treat each remaining digit as its own one-digit number in the pick.
      addToPick(currentChar);
    } else {
      stagedChar = currentChar;
    }
  }

  // This use of the spread operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
  // automatically expands the Set of numbers to an array
  return [...pickNumbers];
};
