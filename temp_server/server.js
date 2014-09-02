/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , temperatures = require('./routes/temperature')
  , http = require('http')
  , path = require('path')
  ,df = require('./dateformat');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/temperatures', temperatures.list);

var serialPort = require('serialport');
var SerialPort = serialPort.SerialPort;

// Set the appropriate COM port to arduino board 
var sp = new SerialPort('COM6', {
  baudrate: 9600,
  parser: serialPort.parsers.readline('\n')
});

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joyan1029',
    database: 'temps'
});

var oldTemp = 0.0; // set a default value as 0.00

http.createServer(app).listen(app.get('port'), function () {

    console.log("Express server listening on port " + app.get('port'));
    sp.on('open', function () {
        console.log('serial opened.');
        try {
            connection.connect();
            console.log('DB is connected successfully.');
        } catch (ex) {
            console.error('DB ERROR: ' + e.name);
            process.exit(-1);
        }

        sp.on('data', function (data) {
            console.log('serial data is recieved: ' + data);
            try {
                data = new String(data);
                var newTemp = data.trim();

                // Set current temperature
                temperatures.set(newTemp);

                // Insert a temperature value when it is changed only.
                if (oldTemp != newTemp) {

                    console.log('temperature is changed from ' + oldTemp + ' to ' + newTemp);
                    if (oldTemp != 0.0) {

                        var dateString = df.dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                        console.log('insert data : ' + dateString + ',' + newTemp);
                        // update new temperature into DB  
                        connection.query('insert into tempData(tempDate, tempCelsius) values(?, ?)',
		                [dateString, newTemp],
		                    function (err) {
		                        if (err) throw err;
		                    });
                    }                   

                    // update the old temperature as current one. 
                    oldTemp = newTemp;
                }

            } catch (e) {
                connection.end();
                console.error('ERROR: ' + e.name);
            }
        });
    });
});
