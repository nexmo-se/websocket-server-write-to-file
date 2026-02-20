# WebSocket server - Write received text streaming to file

## Set up

### Folder

Make sure there is a folder named "recordings" where the log files are created.

### Local deployment

For a `local deployment`, you may use ngrok (an Internet tunneling service) for this WebSocket server application with [an ngrok tunnel](https://ngrok.com/docs/agent/config/v2/#tunnel-configurations).

To do that, [download and install ngrok](https://ngrok.com/download).</br>
Sign in or sign up with [ngrok](https://ngrok.com/), from the ngrok web UI menu, follow the **Setup and Installation** guide.

Set up a domain to forward to the local port 6000 (as this Connector application will be listening on port 6000).

Start ngrok to start the tunnel that forwards to local ports 6000, e.g.<br>
`ngrok start httpbin` (per this [sample yaml configuration file](https://ngrok.com/docs/agent/config/v2/#define-two-tunnels-named-httpbin-and-demo), but needs port 6000 as actual values)


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








