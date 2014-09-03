HomeSensors
===========

Internet of Things Prototyping with Arduino & Node.JS

MIT license

Author: Hyunghun Cho (hyunghunny@gmail.com)
Version: 0.1.1

-------------------------------------------
OVERVIEW:

Do IoT Yourself!

This project aims to exercise what you can develop a thing of IoT.

As a step forward, now it supports following features:
  - Sensing the temperatures through Arduino board & temperature sensor.
  - Transfer the temperature data through serial port.
  - Storing the temperature data into DB.
  - Serving simple mobile web application
  - Showing temperature trends by google chart API.


---------------------------------------------
STEPS TO USE:

Firstly, kindly refer to the pre-requites as follows:

  1) Operating System: Windows 8.1
  2) Node.JS server side JavaScript framework.
  3) MySQL database engine.
  4) Arduino IDE

And setting the mysql is required as follows:

  1) Creating and using a table named as 'temps'
  2) Creating DB schema:
      CREATE TABLE tempData ( 
      tempId int(11) AUTO_INCREMENT NOT NULL, 
      tempDate datetime NOT NULL, 
      tempCelsius decimal(4,2) NOT NULL,  
      constraint tempData_PK primary key (tempId)
    ); 

Now, it is time to program arduino board. see the followings:
  
  1) Setting the curcuit properly. 
    (I couldn't describe the details here. contact me if you want to get it privately.)
    
  2) Connecting the USB cable into PC.
  
  3) Launching Arduino IDE and flush the dht11.ino. 
      (A few modification MAY be required due to the sensor and curcuit design.)

Finally, you SHOULD modify the followings before you run it!

  - The code regarding the COM port of Ardunio board in server.js
  - The code regarding mysql login password in server.js and /routes/temperature.js
  
Play the server with 'node server.js' and access the web application with your web browser.

Thank you for your interesting.
Please contact me if you have any queries. 

-------------------------------------------
SPECIAL THANKS TO:

Daddy's Lab. (www.daddyslab.com)
