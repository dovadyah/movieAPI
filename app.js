const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Set Middleware Functions
app.set("view engine", "ejs"); //Sets the view engine to work with EJS
app.use(express.static("public")); //Serves public files which include js, css and other static assets
app.use(bodyParser.urlencoded({extended: true})); //Allows to parse post request, and retirve data from forms.

//home path
app.get("/", (req, res) => {
    res.render("request");
})

//path to request and retrieve api
app.get("/api", (req, res) => {
    var parsedData;
    const linkAPI = "http://www.omdbapi.com/?apikey=thewdb&t=" + req.query.movie;                    //retrieve link from form and store it
    request(linkAPI, (error, response, body) => {       //request the link and pass a callback func
        if(!error && response.statusCode == 200){      //if request comes back positive
            parsedData = JSON.parse(body);            //parse the body into the var
            res.render("response", {responseData: parsedData}); //pass data to ejs file and render the site
        } else{
            res.send(error);
        }
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000.");
})