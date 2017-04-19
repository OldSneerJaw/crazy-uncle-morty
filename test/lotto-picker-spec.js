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
      let inputString = '926454321';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 9, 26, 45, 4, 3, 2, 1 ]);
    });

    it('should return a seven-number pick for an input with extra digits', function() {
      let inputString = '472844278465445';

      let result = lottoPicker.makePick(inputString);

      expect(result).to.eql([ 47, 28, 44, 27, 8, 46, 54 ]);
    });

    it('should not return a pick if the input contains any non-digit characters', function() {
      let inputString = '1234567a';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('inputString must be a sequence of digits 1 through 9');
      });
    });

    it('should not return a pick if the input is too short', function() {
      let inputString = '123456';

      expect(lottoPicker.makePick).withArgs(inputString).to.throwException(function(ex) {
        expect(ex.message).to.equal('inputString must contain at least 7 digits');
      });
    });
  });

  describe('when making a sequence of picks', function() {
    it('should return only those sequences that come from valid input strings', function() {
      let inputStrings = [ '4938532894754', '7654321', '193854321', '472844278465445', 'a1234567', '987654' ];

      let result = lottoPicker.makePicks(inputStrings);

      expect(result).to.eql({
        '4938532894754': [ 49, 38, 53, 28, 9, 47, 54 ],
        '7654321': [ 7, 6, 5, 4, 3, 2, 1 ],
        '193854321': [ 19, 38, 5, 4, 3, 2, 1 ],
        '472844278465445': [ 47, 28, 44, 27, 8, 46, 54 ]
      });
    });
  });
});
