/**
 * Test for server
 */
import * as chai from 'chai'
import 'mocha'
import app from './server'

const expect = chai.expect;

// tslint:disable-next-line:no-var-requires
chai.use(require('chai-http'));

describe('Server', () => {
  describe('/', () => {
    it('should return message', () => {
      // tslint:disable-next-line:no-backbone-get-set-outside-model
      chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('howdy');
        });
    });
  })
});
