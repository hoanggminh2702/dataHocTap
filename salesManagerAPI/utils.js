const bcrypt = require("bcrypt");
/* encode and check the password */
const saltRounds = 10;
exports.genEncodePassword = async function genEncodePassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

exports.comparePassword = async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
};
