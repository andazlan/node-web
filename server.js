const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("vew engine", "hbs");

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});
/*
app.use((request, response, next) => {
    response.render("maintainance.hbs");
});
*/
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

//Route!
//allow http get request
//param 2 punya 2 parameters yaitu request dan response
//request berisi semua data2 yang kita request, header, body, path dll
//response berisi feedback yang diberikan terhadap request, apakah html atau json dll
app.get('/', (request, response) => {
    //response.send("<h1>hello express</h1>");
    /*
    response.send({
        name : "Andrew",
        likes : [
            "Basket Ball",
            "Code",
            "Eat"
        ]
    });
    */
   response.render("home.hbs", {
        pageTitle : "Home Page",
        welcomeMessage : "Welcome to my website",
        //currentYear : new Date().getFullYear() 
   });
});

app.get('/about', (request, response) => {
    //response.send("About page");
    //cara untuk merender template menggunakan data agar template menampilkan data yang dinamis
    response.render("about.hbs", {
        pageTitle : "About Page",
        welcomeMessage : "Hello there",
        //currentYear : new Date().getFullYear() 
    });
});

app.get('/bad', (request, response) => {
    response.send({
        status : 404,
        message : "Not found bruh!"
    })
});

app.get('/projects', (request, response) => {
    response.render("projects.hbs", {
        pageTitle : "My Projects"
    });
});

//jangan lupa menjalankan perintah ini,
//callback dapat diberikan pada parameter ke 2
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});