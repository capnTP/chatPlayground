const CryptoJS = require('crypto-js');

// let encrypt = () => {
//   var timestamp = new Date().toTimeString();
//   var name =CryptoJS.AES.encrypt('light', timestamp).toString();
//   var room = CryptoJS.AES.encrypt('room', timestamp);
//
//   // console.log(timestamp+'\n');
//   console.log('This is the encryption', name, room.toString());
//   return {timestamp, name, room};
// }
//
// let decrypt = (key) => {
//   let bytes = CryptoJS.AES.decrypt('U2FsdGVkX1 hLNzbwSp/vVcpo8nKC8vXiON35s /W8c=', '1524724984125').toString(CryptoJS.enc.Utf8);
//
//   return bytes;
//   // return text ? text : false;
// }
//
// let hash = encrypt();
// let text = decrypt(hash);
let bytes = CryptoJS.AES.decrypt('U2FsdGVkX1+8Ju5waj42c5gU7kT+uk5umNY7jUaG2Ds=', '1524724984125').toString(CryptoJS.enc.Utf8);

console.log(bytes);
