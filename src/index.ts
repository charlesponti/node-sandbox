import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators'
import { logger } from './logger';

const foo = new Observable();

foo.pipe(
  delay(1000),
  tap(() => logger.info('one second')),
  delay(1000),
  tap(() => logger.info('two seconds')),
)

foo.subscribe(() => {
  logger.info('all done')
})
