const uniqid = require("uniqid");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  console.log("get request");
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    req.body.id = uniqid();
    notes.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("data appended");
      res.json(req.body);
    });
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/index.html"));
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
