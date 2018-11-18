import * as winston from 'winston';

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
