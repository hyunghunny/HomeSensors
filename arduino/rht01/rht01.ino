#include <dht11.h>

dht11 rht01;

#define RHT01PIN 2

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  int chk = rht01.read(RHT01PIN);

//  Serial.print("Temperature (°C): ");
  Serial.print((float)rht01.temperature, 0);
//  Serial.print("\t");
// Serial.print("Humidity (%): ");
//  Serial.print((float)rht01.humidity, 0);
  Serial.print("\n");

  delay(2000);
}


