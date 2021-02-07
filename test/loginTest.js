const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');

const testUser = {
  email: 'test0@email.com',
  password: 'password'
};
const badUser = {
  email: 'test0@email.com',
  password: 'invalid'
};
const invalidInfo = {
  name: 'test0@email.com',
  password: 'invalid'
};
describe('GET/login', () => {
  it("should return the text 'Login route'", done => {
    chai.request(twitter20)
      .get('/login/')
      .end((err, res) => {
      // console.log(res);
        expect(res).to.have.status(200);
        expect(res.text).equal('Login route');
        // expect(res).to.be.an('object');
        // expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('POST/login', () => {
  it('Should return the logged on user', done => {
    chai.request(twitter20)
      .post('/login/')
      .send(testUser)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Should fail with wrong password', done => {
    chai.request(twitter20)
      .post('/login/')
      .send(badUser)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should fail with 404', done => {
    chai.request(twitter20)
      .post('/login/')
      .send(invalidInfo)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(404);
        done();
      });
  });
});
