import * as moment from 'moment';

import { createLogger, format, transports } from 'winston';

const logTransports = [
  new transports.File({
    level: 'error',
    filename: './logs/error.log',
    format: format.json({
      replacer: (key: string, value: Error) => {
        if (key === 'error') {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack,
          };
        }
        return value;
      },
    }),
  }),
  new transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize(),
      format.simple(),
      format.printf(
        ({ level, message, label, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
  }),
];

export const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: logTransports,
  defaultMeta: { service: 'api' },
});
