const moment = require('moment');

// let date = moment();
// date.add(1, 'M');
// console.log(date.format('MMM Do YYYY'));

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

let createdAt = 1234;
let time = moment(createdAt);
// time.add(10, 'h')
console.log(time.format('h:mm a'));
