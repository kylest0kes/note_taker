const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static('./public/'));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8",
  function(err, data) {
    //console.log(data);
    return res.json(JSON.parse(data));
  })
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8",
  function(err, data) {
    const noteDB = JSON.parse(data);
    noteDB.push(newNote);
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(noteDB),
    function(err, data) {
      if (err) throw err;
      return res.json(noteDB);
    })
  });
});

app.delete("/api/notes/:id", function(req, res) {
  const chosenNote = req.params.id;
  console.log(chosenNote);
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8",
  function(err, data) {
    if (err) throw err;
    const noteDB = JSON.parse(data);
    for (let i = 0; i < noteDB.length; i++) {
      if (chosenNote === noteDB[i].id) {
        noteDB.splice(i, 1);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(noteDB),
        function(err, data) {
          if (err) throw err;
          return res.json(noteDB);
        })
      }
    }
  })
});

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on: http://localhost:" + PORT);
});

