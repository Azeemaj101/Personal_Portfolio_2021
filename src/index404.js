const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Variables
let Port = process.env.PORT || 8000;
const static_path = path.join(__dirname, "..", "templates");
let temp_path = path.join(__dirname, "..", "templates", "views");

// Compunents
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", temp_path);

app.get('/', (req, res) => {
    // res.send("Hello");
    console.log("Hello");
    res.render("Error404");
});
// Server
app.listen(Port, () => {
    console.log(`Listing on Port ${Port}`);
})