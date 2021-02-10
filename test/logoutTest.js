const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');

describe('POST/logout', () => {
  it('Should return undefined', done => {
    chai.request(twitter20)
      .post('/logout/')
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(200);
        done();
      });
  });
});
