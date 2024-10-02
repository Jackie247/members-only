const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(`Email:${email}`);
      console.log(`Password:${password}`);
      try {
        // Query the database for the user with matching email
        const { rows } = await pool.query(
          "SELECT * FROM members WHERE email = $1",
          [email]
        );
        const user = rows[0];

        if (!user) {
          // Email is not found in the db
          throw new Error("Email not found");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords don't match
          throw new Error("Invalid Credentials");
        }

        // password and username match
        console.log("User found");
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User ${user}`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserializer ${id}`);
  try {
    const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    if (!user) throw new Error("User not found");

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
