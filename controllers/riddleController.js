const db = require("../db/queries");

exports.getRiddle = (req, res, next) => {
  res.render("riddle");
};

exports.getQuizStart = (req, res, next) => {
  const { question } = req.params;
  switch (question) {
    case "2":
      return res.render("secondRiddle", { error: "" });
    case "3":
      return res.render("thirdRiddle", { error: "" });
    default:
      return res.render("firstRiddle", { error: "" });
  }
};

exports.postRiddleAnswer = async (req, res, next) => {
  const { question } = req.params;
  const { answer } = req.body;

  if (question === "1") {
    if (answer.toLowerCase() === "envelope") {
      res.redirect("/riddle/2");
    } else {
      res.render("firstRiddle", {
        error: "Incorrect answer, try again!",
        hint: "It carries important information, and while it has space for many, it often holds just one.",
      });
    }
  }
  if (question === "2") {
    if (answer.toLowerCase() === "nothing") {
      res.redirect("/riddle/3");
    } else {
      res.render("secondRiddle", {
        error: "Incorrect answer, try again!",
        hint: "It’s what’s left when you take everything away.",
      });
    }
  }
  if (question === "3") {
    if (answer.toLowerCase() === "time") {
      try {
        await db.updateMembership(req.user.id, true);
        console.log(
          `User with ID ${req.user.id} has been given membership status`
        );
        res.redirect("/riddle");
      } catch (err) {
        next(err);
      }
    } else {
      res.render("thirdRiddle", {
        error: "Incorrect answer, try again!",
      });
    }
  }
};
