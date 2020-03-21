import { NextFunction, Request, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res, next: NextFunction) => {
  res.json({ message: 'howdy' });
});

export { router };
