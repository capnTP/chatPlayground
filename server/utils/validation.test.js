const expect = require('expect');

let { isRealString } = require('./validation');

describe ('isRealString' , () => {
  it ('should return true if arg is a valid string', () => {
    expect(isRealString('some text')).toBe(true);
  })

  it ('should reject non-string values', () => {
    expect(isRealString(1234)).toBe(false);
  })

  it ('should reject string with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  })
});
