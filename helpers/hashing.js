const bcrypt = require("bcryptjs");
const saltRounds = 10;

const hashGenerate = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    return false;
  }
};

const hashValidator = async (plainPassword, hashPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  } catch (error) {
    return false;
  }
};

module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;
