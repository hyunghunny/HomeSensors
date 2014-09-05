exports.testSerial = function (test) {

    var serialPort = require('serialport');
    var SerialPort = serialPort.SerialPort;

    test.expect(1);

    try {
        var sp = new SerialPort('COM6', {
            baudrate: 9600,
            parser: serialPort.parsers.readline('\n')
        });

        if (sp == null) throw new Error('no serial connection');

        sp.on('open', function () {
            console.log('serial opened.');
            sp.on('data', function (data) {

                try {
                    data = new String(data);
                    data = data.trim();

                    test.ok(true, data + ' degree');
                    sp.close(function (err) {
                        test.done();
                    })                    

                } catch (e) {
                    test.ok(false, 'ERROR: ' + e.name);
                    test.done();
                }
            });
        });
    }
    catch (err) {
        test.ok(false, 'ERROR: ' + err.name);
        test.done();
    }
 
};