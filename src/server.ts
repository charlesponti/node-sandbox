import * as WebSocket from 'ws';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';

import { json, urlencoded } from 'body-parser';

import { ApplicationError } from './errors';
import { logger } from './logger';
import { router } from './routes';

const app = express();

// Initialise a simple HTTP server
const server = http.createServer(app);

// initialise the websocket server instance
const wss = new WebSocket.Server({ server });

app.use(json({ limit: '100k' }));
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

app.set('port', process.env.PORT || 3000);

app.use(router);

app.use(
  (
    err: ApplicationError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'development' ? err : undefined,
      message: err.message,
    });
  }
);

wss.on('connection', (ws: WebSocket) => {
  // connection is up, let's add a simple event
  ws.on('message', (message: string) => {
    // log the received message and send it back to the client
    logger.info({ label: 'web-socket', message: `Received: ${message}` });
    ws.send(`Hello, you sent -> ${message}`);
  });

  // send immediately a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

export { app, server };
