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
  const { username, email, password } = req.body;
  console.log("User entered:", { username, email, password });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      console.log("New user added", { username, email });
      await db.addUser(username, email, hashedPassword);
      res.redirect("/users/login");
    } catch (err) {
      console.log("Error adding user to DB:", err);
      next(err);
    }
  } catch (err) {
    console.log("Error hashing password:", err);
    next(err);
  }
};
