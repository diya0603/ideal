const express = require("express");
const path = require('path');
const db = require("./routes/db-config");

const PORT = process.env.PORT || 5000;

const app = express(); //start a server

const cookie = require("cookie-parser");


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use("/js", express.static(__dirname + "/public/js"));

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent by API clients)


app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(cookie());
app.use(express.json());

db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));

app.use("/api", require("./controllers/auth"));




app.listen(PORT);