'use strict'

//-------------

require('dotenv').config();

//--
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('express-ws')(app);

app.use(bodyParser.json());

const webSocket = require('ws');
const axios = require('axios');
const fsp = require('fs').promises;
const moment = require('moment');
const path = require('path'); // ensure compatibility between Windwos, MacOS, and Linux, for file writing in a given folder

//---- CORS policy - Update this section as needed ----

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

//--

// ONLY if needed - For self-signed certificate in chain - In test environment
// Must leave next line as a comment in production environment
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

//--- Websocket server ---

app.ws('/socket', async (ws, req) => {

  console.log('>>> WebSocket established');

  let fileName = null;

  let msgCount = 0;
  let firstMessage = true;

  //---------------

  ws.on('message', async (msg) => {
    
    if (typeof msg === "string") {
    
      // console.log("\n>>> Websocket text message - raw :", msg);

      const sessionId = JSON.parse(msg).sessionId;

      if (!fileName) {

        console.log('sessionId:', sessionId);

        fileName = path.join('recordings', moment(Date.now()).format('YYYY-MM-DD_HH-mm-ss-SSS') + '_' + sessionId + '.txt'); // using server local time
        // fileName = path.join('recordings', moment.utc(Date.now()).format('YYYY-MM-DD_HH-mm-ss-SSS') + '_' + sessionId + '.txt'); // using UTC

        try {
          await fsp.writeFile(fileName, '');
        } catch(e) {
          console.log('>>> Error creating file', fileName, e);
        }

        try {
          fsp.appendFile(fileName, "[");
        } catch(error) {
          console.log(">>> Error writing to file", fileName, error);
        }

      } else {

        if (firstMessage) {

          try {
              fsp.appendFile(fileName, msg);
            } catch(error) {
              console.log(">>> Error writing to file", fileName, error);
            }

          firstMessage = false;   

        } else {

          try {
            fsp.appendFile(fileName, "," + msg);
          } catch(error) {
            console.log(">>> Error writing to file", fileName, error);
          }

        }    

        // msgCount++;
        // console.log('Messages count:', msgCount);  

      }
    
    } else {

      console.log("\n>>> Websocket binary message:", msg);

    }

  });

  //--

  ws.on('close', async () => {

    try {
      fsp.appendFile(fileName, "]");
    } catch(error) {
      console.log(">>> Error writing to file", fileName, error);
    }

    console.log("WebSocket closed");
    
  });

});  

//--- If this application is hosted on VCR (Vonage Cloud Runtime) serverless infrastructure --------

app.get('/_/health', async(req, res) => {

  res.status(200).send('Ok');

});

//=========================================

const port = process.env.VCR_PORT || process.env.PORT || 6000;

app.listen(port, () => console.log(`Connector application listening on port ${port}!`));

//------------

