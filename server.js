const { db } = require("./db/db.json");
const fs = require('fs')
const express = require('express');
const path = require('path');
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// tells express where the static assests are
app.use(express.static("public"));




app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get("/api/notes", function(req, res) {
   console.log("get request") 
   fs.readFile("./db/db.json","utf8", (err, data) => {
    if (err)  throw err
    res.send(JSON.parse(data))

   });


});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post("/api/notes", function(req, res) {
    console.log(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('data appended')
    })

    


})









app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });