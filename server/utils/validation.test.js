const expect = require('expect');

let { isRealString, isDuplicate } = require('./validation');

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

describe ('isDuplicate', () => {
  let users = [{
    id: '1',
    name: 'Panda',
    room: 'secret'
  }, {
    id: '1',
    name: 'Lion',
    room: 'secret'
  }];

  it ('should return duplicate entry', () => {
    let res = isDuplicate({name: 'Panda', room: 'secret'}, users);
    expect(res).not.toBeUndefined();
  })

  it ('should not return duplicate entry', () => {
    let res = isDuplicate({name: 'Panda', room: 'secret1'}, users);
    expect(res).toBeUndefined();
  })
});
