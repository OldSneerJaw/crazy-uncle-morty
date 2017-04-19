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

    it('should return a seven-number pick when duplicate values cause it to adjust to a different split', function() {
      // Note that it will parse out "51", "9", "8", "15", then when it gets to the second "51", it will split it into "5" and "1" and store
      // the "5". Then it will carry forward the "1" making the next candidate lotto number "15", which is another duplicate, so it will
      // store the "1" and carry the "5" forward to make "56" the final lotto number of the pick.
      let inputString = '5198155156';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 51, 9, 8, 15, 5, 1, 56 ]);
    });

    it('should return a pick where a zero is the first digit', function() {
      let inputString = '04903805302809047054';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 49, 38, 53, 28, 9, 47, 54 ]);
    });

    it('should return a seven-number pick when a duplicate one-digit number is skipped over', function() {
      // Note that it will parse out "16", "34", "6", then when it gets to the second "16", it will split it into "1" and "6" and store the
      // "1". Then, because the maximum lotto number value is 59, the remaining "6" cannot be the start of a new two-digit number and,
      // because there is already a "6" in the lotto pick, the "6" will simply be skipped. It will then parse out "5", "8", "2" as the
      // remaining values in the pick.
      let inputString = '1634616582';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 16, 34, 6, 1, 5, 8, 2 ]);
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

    it('should not return a pick for an input with extra digits', function() {
      // Note that it parses this string as 47 28 44 27 8 46 54 45, which is one too many lotto numbers for a pick
      let inputString = '472844278465445';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input contains too many numbers to make a valid lotto pick (7)');
      });
    });

    it('should not return a pick for an input where a duplicate number causes it to extend beyond the maximum of 7 numbers', function() {
      // Note that it will parse out "56", "9", "8", "15", "57", then when it gets to the second "15", it will split it into "1" and "5" and
      // store the "1". Then it will carry forward the "5" making the next lotto number "55", followed by "6". This produces a pick with
      // eight lotto numbers, which is invalid.
      let inputString = '569815571556';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input contains too many numbers to make a valid lotto pick (7)');
      });
    });

    it('should not return a pick when a duplicate value cannot be resolved', function() {
      // Note that it will parse out "16", "34", "6", then when it gets to the second "16", it will split it into "1" and "6" and store the
      // "1". Then, because the maximum lotto number value is 59, the remaining "6" cannot be the start of a new two-digit number and,
      // because there is already a "6" in the lotto pick, the "6" will simply be skipped. It will parse out "5", then when it gets to the
      // second "1", it will skip it and, finally, parse the "2" as the last number. Because that is only six lotto numbers, the pick is
      // rejected.
      let inputString = '1634616512';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('Input does not contain enough numbers to make a valid lotto pick (7)');
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
        '5198155156',
        '569815571556',    // rejected because it has a duplicate lotto number (15) that causes it to exhaust subsequent digits
        '472844278465445', // rejected because it has too many (8) lotto numbers
        'z1234567',        // rejected because it contains non-digit characters
        '987654',          // rejected because it does not contain enough characters to make a pick
        '1634616512'       // rejected because it would produce duplicate lotto numbers
      ];

      let result = lottoPicker.makePicks(inputStrings);

      expect(result).to.eql({
        '4938532894754': [ 49, 38, 53, 28, 9, 47, 54 ],
        '7654321': [ 7, 6, 5, 4, 3, 2, 1 ],
        '07060504030201': [ 7, 6, 50, 40, 30, 20, 1 ],
        '193854321': [ 19, 38, 5, 4, 3, 2, 1 ],
        '5198155156': [ 51, 9, 8, 15, 5, 1, 56 ]
      });
    });
  });
});
