const bcrypt = require("bcrypt");

const saltRounds = 12;

module.exports = (plainTextPassword, cb) => {
  bcrypt.hash(plainTextPassword, saltRounds, cb);
};
