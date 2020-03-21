import { logger } from './logger';
import { server } from './server';

import WebSocket = require('ws');

server.listen(process.env.PORT || 8999, () => {
  const address = server.address() as WebSocket.AddressInfo;

  logger.info({
    label: 'server',
    message: `Server started on port ${address.port} : )`,
  });
});
