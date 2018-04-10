import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as http from 'http'
import * as util from 'util'
import * as WebSocket from 'ws'

const app = express()

// Initialise a simple HTTP server
const server = http.createServer(app)

// initialise the websocket server instance
const wss = new WebSocket.Server({ server })

app.use(bodyParser.json({ limit: '100k' }));

app.use('/', (req, res, next) => {
  res.json({ message: 'howdy' })
})

wss.on('connection', (ws: WebSocket) => {
  // connection is up, let's add a simple event
  ws.on('message', (message: string) => {
    // log the received message and send it back to the client
    util.log(`Received: ${message}`)
    ws.send(`Hello, you sent -> ${message}`)
  })

  // send immediately a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server')
})

// start our server
server.listen(process.env.PORT || 8999, () => {
  util.log(`Server started on port ${server.address().port} : )`)
})

export default server
