
var mysql = require('mysql'), df = require('../dateformat');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joyan1029',
    database: 'temps'
});

/*
 * GET temperature listing.
 */
exports.list = function(req, res){

    connection.query('select * from tempData', 
	    function(err, rows, cols){
    	    if (err) throw err;
 		    var jsonData = '{ "all": [ ["Time", "Celsius"]';
		    for (var i = 0 in rows) {
                var dateString = df.dateFormat(rows[i].tempDate, "mm-dd h:MM:ss");
			    jsonData += ",\n [";
			    jsonData += ('"' + dateString + '", ' + rows[i].tempCelsius + "]");
		    }
		    jsonData += "]}";
		    res.send(jsonData); 
    });

  
};

/*
 * GET current temperature
 */
var currentTemp;

exports.set = function (temperature) {
    currentTemp = temperature;
}

exports.get = function () {
    return currentTemp;
}