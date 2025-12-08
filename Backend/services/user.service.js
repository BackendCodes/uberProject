const userModel = require("../models/user.model");

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required to create a user");
  }

  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password,
  });
  return user;
};

module.exports = createUser;
