const expect = require('expect');

const {Users} = require('./users');

describe ('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Panda',
      room: 'Test 1'
    }, {
      id: '2',
      name: 'Lion',
      room: 'Test 1'
    }, {
      id: '3',
      name: 'Bear',
      room: 'Test 3'
    }]
  });

  it ('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Light',
      room: 'demo'
    };
    let res = users.addUser(user.id, user.name, user.room);

    expect(users.users.length).toBe(1);
    expect(users.users).toEqual(expect.arrayContaining(users.users));
  })

  it ('should remove a user', () => {
    let res = users.removeUser('2');
    expect(users.users.length).toBe(2);
    expect(res).toEqual({id: '2', name: 'Lion', room: 'Test 1'});
  })

  it ('should not remove a user', () => {
    let res = users.removeUser('id');
    expect(users.users.length).toBe(3);
    expect(res).toBe('User not found.');
  })

  it ('should find user', () => {
    let res = users.getUser('1');
    expect(res).toEqual({id: '1', name: 'Panda', room: 'Test 1'});
  })

  it ('should not find user', () => {
    let res = users.getUser('id');
    expect(res).toBe('User not found.');
  })

  it ('should return names for same room', () => {
    let res = users.getUserList('Test 1');
    expect(res).toEqual(['Panda', 'Lion']);
  })
})
