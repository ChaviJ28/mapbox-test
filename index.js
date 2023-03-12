var express = require('express');
var app = express();
var session = require('express-session');
var bodyparser = require('body-parser');
var pug = require('pug');
var methodOverride = require('method-override');

app.use(bodyparser.json())
    .use(bodyparser.urlencoded({
        extended: true
    }));
const mongoose = require("./config/database.js");


app.use(express.static(__dirname + "/public"));
app.set('view engine', 'pug');

//import helper files
const helper = require('./helpers/index.js')


//define routes
app.get('/', (req, res) => {
    res.redirect("/map")
})

app.get('/map', (req, res) => {
    res.render("map", { title: "Display" })
})

//create a bus-route
app.post('/bus-route', (req, res) => {
    var promise = helper.createBusRoute(req.body);
    promise.then((obj) => {
        res.json(obj);
    })
})

//list bus-route
app.get('/bus-route', (req, res) => {
    var promise = helper.listBusRoute({});
    promise.then((list) => {
        res.json(list);
    })
})

//create a user-device
app.post('/user-device', (req, res) => {
    var promise = helper.createUserDevice(req.body);
    promise.then((obj) => {
        res.json(obj);
    })
})

//list user-device
app.get('/user-device', (req, res) => {
    var promise = helper.listuserDevice({});
    promise.then((list) => {
        res.json(list);
    })
})

//adds new track record
app.post('/new-record', (req, res) => {
    var promise = helper.createTrackRecord(req.body);
    promise.then((obj) => {
        res.json(obj);
    })
})

//list track record
app.get('/record', (req, res) => {
    var promise = helper.listTrackRecord({});
    promise.then((list) => {
        res.json(list);
    })
})


var port = 3000;
app.listen(port, () => {
    console.log('listening on port ' + port)
})