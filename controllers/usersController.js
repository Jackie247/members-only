const db = require("../db/queries");
const bcrypt = require("bcryptjs");

exports.getLogin = async (req, res, next) => {
  try {
    res.render("login", { errors: {} });
  } catch (err) {
    next(err);
  }
};

exports.getLogout = async (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect("/");
  });
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
