const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');

const userToUpdate = {
  id: 3,
  name: 'Kal-El',
  password: '007000ABC=c',
  avatar: 'https://picsum.photos/210'
};

const notExistUser = {
  id: 1000,
  name: 'Jean-Luc Picard',
  password: '007000ABC=c',
  avatar: 'https://picsum.photos/210'
};

describe('GET/users', () => {
  it('should return a list of users', done => {
    chai.request(twitter20)
      .get('/users/')
      .end((err, res) => {
      // console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET/users/:id', () => {
  it('should return one user', done => {
    chai.request(twitter20)
      .get('/users/1')
      .end((err, res) => {
      // console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an empty array', done => {
    chai.request(twitter20)
      .get('/users/1000')
      .end((err, res) => {
      // console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(0);
        done();
      });
  });
});

describe('POST/users/:id', () => {
  it('should return one updated user', done => {
    chai.request(twitter20)
      .put('/users/3')
      .send(userToUpdate)
      .end((err, res) => {
      // console.log(`logged res.body ${res.body[0].name}`);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).equal('Kal-El');
        done();
      });
  });
  it('should return an empty array', done => {
    chai.request(twitter20)
      .put('/users/1000')
      .send(notExistUser)
      .end((err, res) => {
      // console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(0);
        done();
      });
  });
});
