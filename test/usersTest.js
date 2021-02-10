const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

const twitter20 = require('../src/index');
const agent = chai.request.agent(twitter20);

const logonUser = {
  email: 'test0@email.com',
  password: 'password'
};

const supermanLogon = {
  email: 'superman@dailyplanet.com',
  password: 'password'
};
const supermanUpdate = {
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

/*describe('GET/users', () => {
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
});*/

describe('GET/users/:id', () => {
  it('should return one user', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .get('/users/1')
      .then((res2) => {
        // console.log("my profile", res2.body);
        expect(res2).to.have.status(200); 
        expect(res2).to.be.an('object');
        expect(res2.body).to.be.an('array'); 
        expect(res2.body).to.have.length(1); 
        expect(res2.body[0].email).equal('test0@email.com');               
        done();           
      });
    });
  });

  it('should return an empty array', done => {
    agent.post('/login/') 
    .send(logonUser)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .get('/users/1000')
      .then((res2) => {
        // console.log("my empty profile", res2.body);
        expect(res2).to.have.status(404); 
        expect(res2).to.be.an('object');
        expect(res2.body).to.be.an('array'); 
        expect(res2.body).to.have.length(0);       
        done();           
      });
    });
  });  
});

describe('PUT/users/:id', () => {
  it('should return one updated user', done => {
    agent.post('/login/') 
    .send(supermanLogon)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .put('/users/3')
      .send(supermanUpdate)
      .then((res2) => {
         console.log(`logged res.body ${res2.body[0].name}`);
        expect(res2).to.have.status(200); 
        expect(res2).to.be.an('object');
        expect(res2.body).to.be.an('array');  
        expect(res2.body[0].name).equal('Kal-El');      
        done();           
      });
    });
  });

  it('should return an empty array', done => {
    agent.post('/login/') 
    .send(supermanLogon)
    .then((res1) => {
      // console.log("logonUser", res1.body.logonUser);
      agent
      .put('/users/1000')
      .send(notExistUser)
      .then((res2) => {
        // console.log("not exist", res2.body);
        expect(res2).to.have.status(404);
        expect(res2).to.be.an('object');
        expect(res2.body).to.be.an('array');
        expect(res2.body).to.have.length(0);    
        done();           
      });
    });
  });
});
