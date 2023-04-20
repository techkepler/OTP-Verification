const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.post("/verify", (req, res) => {
      const code = req.body.code;
      console.log(code.length, code, code.charAt(5));
      if (!code || code.length !== 6 || code.charAt(5) === "7") {
        return res.status(400).json({ error: "Verification Error" });
      }
      return res.status(200).json("success");
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
