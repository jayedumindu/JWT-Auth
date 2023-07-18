const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const TOKEN_SECRET =
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

app.listen(8080, () => {
  console.log("server is listening on port : " + 8080);
});

app.post("/createUser", (req, res) => {
  // json should contain header,payload
  console.log(req.body);
  res.json(generateAccessToken(req.body));
});

function generateAccessToken(payload) {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1800s" });
}

function validateToken(token, res) {
    console.log(token)
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user) {
        console.log("user verfication successful!")
        res.sendStatus(200)
    }
  });
}

app.get("/verify", (req, res) => {
  // unplug the token from the header 'Authentication'
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  validateToken(token, res);
});
