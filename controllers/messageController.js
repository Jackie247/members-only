const db = require("../db/queries");

exports.getMessages = async (req, res, next) => {
  try {
    console.log("Fetching messages from database");
    const messages = await db.getMessages();
    console.log(messages);
    res.render("index", { messages: messages });
  } catch (err) {
    next(err);
  }
};

exports.postMessage = async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  const { msgTitle, msgDescription } = req.body;
  const time = Date.now();
  const timestamp = new Date(time).toISOString();
  const id = req.user.id;
  const username = req.user.username;

  try {
    console.log({ msgTitle, msgDescription, timestamp, id, username });
    await db.addMessage(msgTitle, msgDescription, timestamp, id, username);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
