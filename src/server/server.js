var express = require('express');
var app = express();
var url = require('url');
var mysql = require("mysql");
var urlencodedParser = require('urlencoded-parser'); // ES5
var bodyParser = require('body-parser');
const cors = require('cors');
const eventApi = require('../server/eventApi.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(urlencodedParser);

app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
}));

app.use('/api/event', eventApi);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

