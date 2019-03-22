var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

// var db = require("./models");

var PORT = process.env.PORT || 9090;

const app = express();

const router = express.Router();

require("./config/routes")(router);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(router);

mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true }); 

const dataBase = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";

mongoose.connect(dataBase, function(error){
    if (error) {
        console.log(error);
    }
    else {
        console.log("connection succsessful!");
    }
})


app.get("/", function(req, res){
    res.render("home")
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });