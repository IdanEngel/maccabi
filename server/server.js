/* eslint-disable no-unused-vars */
const express = require("express");
const dataBase = require("./DataBase.json");
const fs = require("fs");
const path = require("path");
const { check, validationResult } = require("express-validator");

let idHelper;

const app = express();

app.use(express.json({ extended: false }));

app.get("/users", (req, res) => {
  res.send(dataBase.users);
});

app.post(
  "/users",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
  ],
  async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, age } = req.body;
    try {
      const db = dataBase.users;
      let user = await db.find((f) => (f.email === email ? true : false));

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      if (typeof age !== "number") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Age must be a number" }] });
      }

      db.length <= 0 ? (idHelper = 0) : (idHelper = db.length);
      req.body.id = idHelper;
      const data = req.body;
      db.push(data);
      fs.writeFileSync(
        path.resolve(__dirname, "DataBase.json"),
        JSON.stringify({ users: db })
      );
      console.log(db);
      console.log(req.body);
      res.send(data);
    } catch (err) {
      console.error("err msg:", err.message);
      res.status(500).send("Server error");
    }
  }
);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
