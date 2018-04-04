class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    let index = this.users.findIndex(user => user.id === id);
    if (index === -1)
      return 'User not found.';
      
    let user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }
  getUser (id) {
    let user = this.users.find(user => user.id === id);
    if (!user)
      return 'User not found.';

    return user;
  }
  getUserList (room) {
    let users = this.users.filter(user => user.room === room);
    let namesArray = users.map(user => user.name);

    return namesArray;
  }
}

module.exports = { Users };
