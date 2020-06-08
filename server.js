const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });

app.get("/notes", function (req, res) {
res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on: http://localhost:" + PORT);
  });

