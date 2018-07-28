const {isRealString} = require('./validation');
const expect = require('expect');
describe('Testing string validation',()=>{
  it('should return true validating the correct string',()=>{
    expect(isRealString('123')).toBe(true);
  });

    it('should return false validating the empty string',()=>{
      expect(isRealString('')).toBe(false);
    });

      it('should return fals validating the space string',()=>{
        expect(isRealString('  ')).toBe(false);
      });

        it('should return false validating the number',()=>{
          expect(isRealString(123)).toBe(false);
        });
});
