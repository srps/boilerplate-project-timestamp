// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Root API
app.route('/api')
  .get((req, res) => {
    const now = new Date();
    res.json({unix: Date.now(),
              utc: now.toUTCString()});
  });

// Milliseconds API
app.route('/api/:date([0-9]+)')
  .get((req, res) => {
    res.json({unix: Number(req.params.date),
              utc: new Date(parseInt(req.params.date)).toUTCString(),})
  });

// Date API
app.route('/api/:date')
  .get((req, res) => {
  const unixTimestamp = Date.parse(req.params.date);
  const parsedDate = new Date(req.params.date);
  res.json(!unixTimestamp
          ? { error : "Invalid Date" }
          : {unix: unixTimestamp,
        utc: parsedDate.toUTCString(),});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
