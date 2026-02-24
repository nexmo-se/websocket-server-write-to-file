# WebSocket server - Write received text streaming to file

## Set up

### Folder

Make sure there is a folder named "recordings" where the log files will be created.

### Local deployment

For a `local deployment`:</br>
- If your client application server host is on the Internet, to be able to establish a WebSocket to this server application host, you may use ngrok (an Internet tunneling service) with this WebSocket server application with [an ngrok tunnel](https://ngrok.com/docs/agent/config/v2/#tunnel-configurations).</br>
- If your client application server host that establishes the WebSocket and this application server host are both on the same local network, there is no need to use ngrok. This application will be listening on its server host IP address and TCP port 6000 for incoming WebSocket connections. _(Skip to "Running this application")_</br>


To use ngrok, [download and install ngrok](https://ngrok.com/download).</br>
Sign in or sign up with [ngrok](https://ngrok.com/), from the ngrok web UI menu, follow the **Setup and Installation** guide.

Set up a domain to forward to the local port 6000 (as this application will be listening on port 6000).

Start ngrok to start the tunnel that forwards to local ports 6000, e.g.<br>
`ngrok start httpbin` (per this [sample yaml configuration file](https://ngrok.com/docs/agent/config/v2/#define-two-tunnels-named-httpbin-and-demo), but needs port 6000 as actual values)


### Running this application

Have Node.js installed on your system, this application has been tested with Node.js version 22.16.<br>

Install node modules with the command:<br>
 ```bash
npm install
```

Launch the application:<br>
```bash
node websocket-server-write-to-file
```

Default local (not public!) of this application server `port` is: 6000.








