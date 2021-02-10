const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');
const agent = chai.request.agent(twitter20).keepOpen();

const logonUser = {
  email: 'test0@email.com',
  password: 'password'
};

describe('GET/tweets', () => {
  it('Should return the tweets for the logged on user', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .get('/tweets/')
      .then((res2) => {
        // console.log("my tweets", res2)
        expect(res2).to.have.status(200); 
        done();           
      });
    });
  });
});

describe('POST/tweets', () => {
  it('should add and return new tweet', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .post('/tweets/')
      .send({message: 'This is a test tweet.'})
      .then((res2) => {
        console.log("my new tweet", res2)
        expect(res2).to.have.status(201); 
        done();           
      });      
    });    
  });
});

describe('PUT/tweets/:id', () => {
  it('should update and return updated tweet', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .post('/tweets/')
      .send({
        id: 1,
        message: 'This is an updated tweet.'
      })
      .then((res2) => {
        // console.log("my updated tweet", res2)
        expect(res2).to.have.status(201); 
        done();           
      });      
    });    
  });
});

describe('DELETE/tweets/:id', () => {
  it('should delete tweet and return empty object', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .delete('/tweets/')
      .send({id: 1})
      .then((res2) => {
        // console.log("my deleted tweet", res2)
        expect(res2).to.have.status(200); 
        done();           
      });      
    });    
  });
});
