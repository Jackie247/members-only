const db = require("../db/queries");
const bcrypt = require("bcryptjs");

exports.getLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    next(err);
  }
};
exports.postLogin = async (req, res, next) => {
  // TO DO
  try {
  } catch (err) {
    next(err);
  }
};

exports.getSignup = async (req, res, next) => {
  try {
    res.render("signup", { errors: {} });
  } catch (err) {
    next(err);
  }
};
exports.postSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log("error hashing password");
      }
      try {
        await db.addUser(username, email, hashedPassword);
      } catch (err) {
        console.log(err);
        next(err);
      }
    });

    res.redirect("/users/login");
  } catch (err) {
    next(err);
  }
};
