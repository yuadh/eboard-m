/**
  ******************************************************************************
  * @file    srvr.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    23-January-2018
  * @brief   ESP8266 WiFi server.
  *          This file provides firmware functions:
  *           + Sending web page of the tool to a client's browser
  *           + Uploading images from client part by part
  *
  ******************************************************************************
  */

/* Includes ------------------------------------------------------------------*/
//#include <ESP8266WiFi.h>// ESP8266 and WiFi classes
#include <WiFi.h>

#include "buff.h" // POST request data accumulator
#include "epd.h"  // e-Paper driver

#include "scripts.h" // JavaScript code
#include "css.h"     // Cascading Style Sheets
#include "html.h"    // HTML page of the tool


/* The 'index' page flag ------------------------------------------------------*/
bool isIndexPage = true; // true : GET  request, client needs 'index' page;
// false: POST request, server sends empty page.
/* Server initialization -------------------------------------------------------*/

/* SSID and password of your WiFi net ----------------------------------------*/
/*const char *ssid = "iot421"; //"your ssid";*/
const char *ssid = "yuadh"; //"your ssid";
const char *password = "37214832";   //"your password";

/* Server and IP address ------------------------------------------------------*/
WiFiServer server(80); // Wifi server exemplar using port 80
IPAddress myIP;        // IP address in your local wifi net


String Srvr__setup()
{
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    // Applying SSID and password
    WiFi.begin(ssid, password);
    // Waiting the connection to a router
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    // Connection is complete
    Serial.println("");
    Serial.println("WiFi connected");
    // Start the server
    server.begin();
    Serial.println("Server started");
    myIP = WiFi.localIP();
    // Show obtained IP address in local Wifi net
    Serial.println(myIP);
    return myIP.toString().c_str();;
}

/* Sending a script to the client's browser ------------------------------------*/
bool Srvr__file(WiFiClient client, int fileIndex, char *fileName)
{
    // Print log message: sending of script file
    Serial.print(fileName);

    // Sent to the 'client' the header describing the type of data.
    client.print(fileIndex == 0
                 ? "HTTP/1.1 200 OK\r\nContent-Type: text/css\r\n\r\n"
                 : "HTTP/1.1 200 OK\r\nContent-Type: text/javascript\r\n\r\n");

    // Choose the index of script
    // (ESP8266 can't to send all of code by one file
    // and needs split it on a few parts)
    switch (fileIndex) {
    case 0:
        sendCSS(client);
        break;
    case 1:
        sendJS_A(client);
        break;
    case 2:
        sendJS_B(client);
        break;
    case 3:
        sendJS_C(client);
        break;
    case 4:
        sendJS_D(client);
        break;
    }

    client.print("\r\n");
    delay(1);

    // Print log message: the end of request processing
    Serial.println(">>>");

    return true;
}

/* The server state observation loop -------------------------------------------*/
bool Srvr__loop()
{
    // Looking for a client trying to connect to the server
    WiFiClient client = server.available();

    // Exit if there is no any clients
    if (!client)
        return false;

    // Print log message: the start of request processing
    Serial.print("<<<");

    // Waiting the client is ready to send data
    while (!client.available())
        delay(1);

    // Set buffer's index to zero
    // It means the buffer is empty initially
    Buff__bufInd = 0;

    // While the stream of 'client' has some data do...
    while (client.available()) {
        // Read a character from 'client'
        int q = client.read();

        // Save it in the buffer and increment its index
        Buff__bufArr[Buff__bufInd++] = (byte)q;

        // If the carachter means the end of line, then...
        if ((q == 10) || (q == 13)) {
            // Clean the buffer
            Buff__bufInd = 0;
            continue;
        }

        // Requests of files
        if (Buff__bufInd >= 11) {
            if (Buff__signature(Buff__bufInd - 11, "/styles.css"))
                return Srvr__file(client, 0, "styles.css");

            if (Buff__signature(Buff__bufInd - 11, "/scriptA.js"))
                return Srvr__file(client, 1, "scriptA.js");

            if (Buff__signature(Buff__bufInd - 11, "/scriptB.js"))
                return Srvr__file(client, 2, "scriptB.js");

            if (Buff__signature(Buff__bufInd - 11, "/scriptC.js"))
                return Srvr__file(client, 3, "scriptC.js");

            if (Buff__signature(Buff__bufInd - 11, "/scriptD.js"))
                return Srvr__file(client, 4, "scriptD.js");
        }

        // If the buffer's length is larger, than 4 (length of command's name), then...
        if (Buff__bufInd > 4) {
            // It is probably POST request, no need to send the 'index' page
            isIndexPage = false;

            // e-Paper driver initialization
            if (Buff__signature(Buff__bufInd - 4, "EPD")) {
                Serial.print("\r\nEPD\r\n");
                // Getting of e-Paper's type
                EPD_dispIndex = (int)Buff__bufArr[Buff__bufInd - 1] - (int)'a';
                if(EPD_dispIndex < 0)
                  EPD_dispIndex = (int)Buff__bufArr[Buff__bufInd - 1] - (int)'A' + 26;
                // Print log message: initialization of e-Paper (e-Paper's type)
                Serial.printf("EPD %s", EPD_dispMass[EPD_dispIndex].title);

                // Initialization
                EPD_dispInit();
                //client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
                break;
            }

            // Image loading
            if (Buff__signature(Buff__bufInd - 4, "LOAD")) {
                // Print log message: image loading
                Serial.print("LOAD");

                // Load data into the e-Paper
                // if there is loading function for current channel (black or red)
                if (EPD_dispLoad != 0)
                    EPD_dispLoad();
                //client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
                break;
            }

            // Select the next data channel
            if (Buff__signature(Buff__bufInd - 4, "NEXT")) {
                // Print log message: next data channel
                Serial.print("NEXT");

                // Instruction code for for writting data into
                // e-Paper's memory
                int code = EPD_dispMass[EPD_dispIndex].next;

                // If the instruction code isn't '-1', then...
                if (code != -1) {
                    // Print log message: instruction code
                    Serial.printf(" %d", code);

                    // Do the selection of the next data channel
                    EPD_SendCommand(code);
                    delay(2);
                }

                // Setup the function for loading choosen channel's data
                EPD_dispLoad = EPD_dispMass[EPD_dispIndex].chRd;
                //client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
                break;
            }

            // If the loading is complete, then...
            if (Buff__signature(Buff__bufInd - 4, "SHOW")) {
                // Show results and Sleep
                EPD_dispMass[EPD_dispIndex].show();

                //Print log message: show
                Serial.print("\r\nSHOW");
                //client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
                break;
            }

            if (Buff__signature(Buff__bufInd - 4, "TEST")) {
                // Show results and Sleep
               

                //Print log message: show
                Serial.print("\r\nTEST");
                client.println("Ok");
                //client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
                break;
            }

            // If the routine reaches this code,
            // it means the there is no known commands,
            // the server has to send the 'index' page
            isIndexPage = true;
        }
    }

    // Clear data stream of the 'client'
    client.flush();

    // Sent to the 'client' the header describing the type of data.
    // In this case 'Content-Type' is 'text/html'
    client.print("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");

    // Send the 'index' page if it's needed
    if (isIndexPage)
        sendHtml(client, myIP);
    else
        client.print("Ok!");

    client.print("\r\n");
    delay(1);

    // Print log message: the end of request processing
    Serial.println(">>>");
    return true;
}
