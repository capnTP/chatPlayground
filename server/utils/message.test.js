const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it ('should return a message object with createdAt', () => {
    expect(generateMessage('Admin', 'test')).toMatchObject({
      from: 'Admin',
      text: 'test',
      createdAt: expect.any(String)
    })
  })
});
