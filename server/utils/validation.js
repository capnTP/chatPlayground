let isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

let isDuplicate = (request, list) => {
  let dup = list.find(user => user.name === request.user && user.room === request.session);

  return dup;
};

module.exports = { isRealString, isDuplicate };
