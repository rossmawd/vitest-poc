const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/details", (req, res) => {
  const { name, email, framework } = req.body;
  const message = `Hello ${name}, your email is ${email}, and your favorite framework is ${framework}, but we can forgive you for that`;
  const response = { message };
  res.json(response);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
