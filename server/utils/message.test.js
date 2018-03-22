const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it ('should return a message object with createdAt', () => {
    expect(generateMessage('Admin', 'test')).toMatchObject({
      from: 'Admin',
      text: 'test',
      createdAt: expect.any(String)
    })
  })
});

describe('generateLocationMessage', () => {
  it ('should generate correct location obj', () => {
    let lat = 13.253;
    let lng = 100.5333;
    let obj = generateLocationMessage('Admin', lat, lng);

    expect(obj).toBeTruthy();
    expect(obj.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(obj.createdAt).toBeTruthy();
  })
});
