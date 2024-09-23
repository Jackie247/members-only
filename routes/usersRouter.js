let express = require("express");
let router = express.Router();
const { body, validationResult } = require("express-validator");
const usersController = require("../controllers/usersController");

router.get("/login", usersController.getLogin);
router.post("/login", usersController.getLogin);

router.get("/signup", usersController.getSignup);
router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      })
      .withMessage("Passwords do not match!"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      res.redirect("login");
    }
    // refresh the page and pass errors to be rendered on view
    console.log(result.array());
    res.render("signup", { errors: result.array() });
  },
  usersController.postSignup
);

module.exports = router;
