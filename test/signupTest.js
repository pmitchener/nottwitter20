const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');

const newUser = {
  name: 'Josey Wales',
  email: 'josey.wales@badcompany',
  password: '0ldW3$t',
  avatar: 'https://picsum.photos/210'
};

const alreadyExistUser = {
  name: 'David Henry',
  email: 'test0@email.com',
  password: 'test0001',
  avatar: 'https://picsum.photos/210'
};

describe('GET/signup', () => {
  it("should return the text 'Signup route'", done => {
    chai.request(twitter20)
      .get('/signup/')
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(200);
        expect(res.text).equal('Signup route');
        done();
      });
  });
});

describe('POST/signup', () => {
  it('Should return the new user', done => {
    chai.request(twitter20)
      .post('/signup/')
      .send(newUser)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Should fail with duplicate key violation', done => {
    chai.request(twitter20)
      .post('/signup/')
      .send(alreadyExistUser)
      .end((err, res) => {
        // console.log("body error",res.body.error);
        expect(res).to.have.status(200);
        expect(res.body.error).to.contain('duplicate key value violates unique constraint');
        done();
      });
  });
});
