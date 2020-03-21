import * as request from 'supertest';

import { app } from './server';

describe('Server', () => {
  describe('/', () => {
    it('should return message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('howdy');
    });
  });
});
