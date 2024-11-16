const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/pets.json');

const getPets = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data).pets;
};

const savePets = (pets) => {
  const data = JSON.stringify({ pets }, null, 2);
  fs.writeFileSync(dbPath, data);
};

module.exports = { getPets, savePets };
