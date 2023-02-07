 /**
  ******************************************************************************
  * @file    Loader.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    23-January-2018
  * @brief   The main file.
  *          This file provides firmware functions:
  *           + Initialization of Serial Port, SPI pins and server
  *           + Main loop
  *
  ******************************************************************************
*/ 

/* Includes ------------------------------------------------------------------*/
#include "srvr.h" // Server functions
#define AIO_SERVER    "127.0.0.1"
#define AIO_SERVERPORT   1883
#define AIO_USERNAME   "" //用户和key可以忽略
#define AIO_KEY        "121212" //用户和key可以忽略
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include<ArduinoJson.h>

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
//Adafruit_MQTT_Subscribe ip = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "ZUCC-ZS/init/zs/1");

Adafruit_MQTT_Publish ip = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "yuadh/IP");

StaticJsonDocument<200> doc;
String output;


void MQTT_connect() {
  int8_t ret;
  // Stop if already connected. 
  if (mqtt.connected()) {
    return;
  }
  Serial.print("Connecting to MQTT... "); 
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected 
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying MQTT connection in 5 seconds..."); 
    mqtt.disconnect();
    (5000);  // wait 5 seconds retries--;
    if (retries == 0) {
      // basically die and wait for WDT to reset me 
      while (1);
    }
  }
  Serial.println("MQTT Connected!");
}

String ipAdd;

/* Entry point ----------------------------------------------------------------*/
void setup() 
{
    // Serial port initialization
    Serial.begin(115200);
    delay(10);
    ipAdd =  Srvr__setup();  
    // Server initialization
    // SPI initialization
    EPD_initSPI();
    MQTT_connect();
    doc["eid"] = "root";
    doc["ip"] = ipAdd; 
    serializeJson(doc,output);
    if (! ip.publish(output.c_str())) 
    { 
       Serial.println(F("Failed"));
    } else {
       Serial.println(F("OK!"));
        delay(200);
    }
    // The server state observation
    // Initialization is complete
    Serial.print("\r\nOk!\r\n");
}

/* The main loop -------------------------------------------------------------*/
void loop() 
{
   
    Srvr__loop();
}
