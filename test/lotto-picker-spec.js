const expect = require('expect.js');
const lottoPicker = require('../src/lotto-picker.js');

describe('The lotto picker', function() {
  describe('when making a single pick', function() {
    it('should return a seven-number pick for a standard input', function() {
      let inputString = '4938532894754';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 49, 38, 53, 28, 9, 47, 54 ]);
    });

    it('should return a seven-number pick for an input with exactly the right number of digits', function() {
      let inputString = '1234567';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 1, 2, 3, 4, 5, 6, 7 ]);
    });

    it('should return a seven-number pick for an input that runs out of characters for two-digit numbers', function() {
      let inputString = '92004004321';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 9, 20, 40, 4, 3, 2, 1 ]);
    });

    it('should return a pick where a zero is the first digit', function() {
      let inputString = '04903805302809047054';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 49, 38, 53, 28, 9, 47, 54 ]);
    });

    it('should not return a pick if the input contains any non-digit characters', function() {
      let inputString = '1234567a';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input must be a sequence of digits only');
      });
    });

    it('should not return a pick if the input is too short', function() {
      let inputString = '123456';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input must contain at least 7 characters');
      });
    });

    it('should not return a pick if it ends with a zero in certain circumstances', function() {
      // See the README for a better explanation of why this fails.
      // A considerably more thorough and complex solution should be able to produce the pick 7 6 5 4 3 2 10, but that is beyond the current
      // implementation's capabilities.
      let inputString = '76543210';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input does not contain enough numbers to make a valid lotto pick (7)');
      });
    });

    it('should not return a pick if a zero in the middle causes it to exhaust the remaining digits', function() {
      // See the README for a better explanation of why this fails.
      // A considerably more thorough and complex solution should be able to produce the pick 1 2 30 4 5 6 7, but that is beyond the current
      // implementation's capabilities.
      let inputString = '12304567';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input does not contain enough numbers to make a valid lotto pick (7)');
      });
    });

    it('should not return a seven-number pick for an input with extra digits', function() {
      let inputString = '472844278465445';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input contains too many numbers to make a valid lotto pick (7)');
      });
    });

    it('should not return a seven-number pick for an input with duplicate numbers', function() {
      let inputString = '569815571556';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input contains duplicate lotto numbers: 15');
      });
    });
  });

  describe('when making a sequence of picks', function() {
    it('should return only those sequences that come from valid input strings', function() {
      let inputStrings = [
        '4938532894754',
        '7654321',
        '07060504030201',
        '193854321',
        '569815571556',    // rejected because it has duplicate lotto numbers (15)
        '472844278465445', // rejected because it has too many (8) lotto numbers
        'z1234567',        // rejected because it contains non-digit characters
        '987654'           // rejected because it does not contain enough characters to make a pick
      ];

      let result = lottoPicker.makePicks(inputStrings);

      expect(result).to.eql({
        '4938532894754': [ 49, 38, 53, 28, 9, 47, 54 ],
        '7654321': [ 7, 6, 5, 4, 3, 2, 1 ],
        '07060504030201': [ 7, 6, 50, 40, 30, 20, 1 ],
        '193854321': [ 19, 38, 5, 4, 3, 2, 1 ]
      });
    });
  });
});
