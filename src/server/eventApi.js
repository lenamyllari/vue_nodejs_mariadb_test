const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../database/db.js');
const db = config.database;
const url = require('url');
const con = mysql.createConnection({user: db.user, password: db.password, host: db.host, database: db.database});
con.connect();


router.post('/addEvent', (req,res) => {
    var jsonObj = req.body;
    /* eslint-disable no-console */
    console.log("req.name" + req.eventPlace);
    /* eslint-enable no-console */
    response = {
        eventName: req.body.eventName,
        eventPlace: req.body.eventPlace,
        eventDate: req.body.eventDate,
        eventType: req.body.eventType
    };
    // var jsonObj = req.body;
    var sql = "SELECT Location_id from location WHERE Location_name = ?";
    con.query(sql, [jsonObj.eventPlace], function (err, result) {
        if (result) {
            if (result.length > 0) {
                var locationId = result[0].Location_id;
                /* eslint-disable no-console */
                console.log("id on " + locationId);
                /* eslint-enable no-console */
            } else {
                var sql = "SELECT location_id FROM location";
                con.query(sql, function (err, result) {
                    if (result) {
                        /* eslint-disable no-console */
                        console.log((result));
                        /* eslint-enable no-console */
                        locationId = result.length + 1;
                        var sql = "INSERT INTO location (Location_id, Location_name) VALUES (?,?)";
                        con.query(sql, [locationId, jsonObj.eventPlace], function (err, result) {
                            if (err) throw err;
                            /* eslint-disable no-console */
                            console.log("1 record inserted into location");
                            /* eslint-enable no-console */
                        })
                    }
                })
            }
            sql = "SELECT event_id FROM event";
            con.query(sql, function (err, result) {
                if (result) {
                    /* eslint-disable no-console */
                    console.log((result));
                    /* eslint-enable no-console */
                    var eventId = result.length;
                    /* eslint-disable no-console */
                    console.log(eventId);
                    /* eslint-enable no-console */
                    var sql = "INSERT INTO event (Event_id, Name, Type, Location_Location_id) VALUES (?, ?, ?, ?)";
                    con.query(sql, [eventId, jsonObj.eventName, jsonObj.eventType, locationId], function (err, result) {
                        if (err) throw err;
                        /* eslint-disable no-console */
                        console.log("1 record inserted into event");
                        /* eslint-enable no-console */
                    });
                    sql = "INSERT INTO event_date (Date, Event_id) VALUES (?, ?)";
                    con.query(sql, [jsonObj.eventDate, eventId], function (err, result) {
                        if (err) throw err;
                        /* eslint-disable no-console */
                        console.log("1 record inserted into event_date");
                        /* eslint-enable no-console */
                    })
                }
            });
        }

         res.end(JSON.stringify(response));
        /* eslint-disable no-console */
        console.log(response);
        console.log("got a POST request for the homepage");
        //console.log("body: %j", req.body);
        /* eslint-enable no-console */
    });
});

router.get("/searchEvent", function (req, res) {
    console.log("get events ");

    var q = url.parse(req.url, true).query;
    var startDate = q.startDate;
    var endDate = q.endDate;
    var sql = "SELECT event_date.Date, event.Name, event.Type, Location.Location_name" +
        " FROM event_date, event, location" +
        " WHERE event_date.Event_id = event.Event_id and event.Location_Location_id = Location.Location_id" +
        " and event_date.Date >= ? and event_date.Date <= ?" + " GROUP BY Name" + " ORDER BY event_date.Date";

    con.query(sql, [startDate, endDate], function (err, result) {
        if (err)
            throw (err);
        else{
            console.log(result);

            res.send(JSON.stringify(result));
        }
    });
});

router.get("/events", function (req, res) {
    console.log("get all events ");


    var sql = " select * from event inner join location on event.location_location_id = location.location_id inner join event_date on event_date.event_id = event.event_id;";

    con.query(sql,  function (err, result) {
        if (err)
            throw (err);
        else{
            console.log(result);

            res.send(JSON.stringify(result));
        }
    });
});

module.exports = router;