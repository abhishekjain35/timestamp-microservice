// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// your first API endpoint...
app.get("/api/:timestamp", function (req, res) {
  const { timestamp } = req.params;
  let finalObj = {};
  if (Number(timestamp)) {
    finalObj.unix = Number(timestamp);
    finalObj.utc = new Date(Number(timestamp)).toUTCString();
  } else {
    let newDate = new Date(timestamp);
    if (newDate.getTime()) {
      finalObj.unix = newDate.getTime();
      finalObj.utc = newDate.toUTCString();
    } else {
      finalObj.error = "Invalid Date";
    }
  }
  res.json(finalObj);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
