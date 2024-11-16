const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

const getUsers = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data).users;
};

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  const data = JSON.stringify({ users }, null, 2);
  fs.writeFileSync(dbPath, data);
};

module.exports = { getUsers, saveUser };
