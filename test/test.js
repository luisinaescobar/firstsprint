const { expect } = require('chai');
const request = require('supertest');
const { makeServer } = require('../src/server');

describe('API Sign up test', () => {
  // Tests
  it('The api must create a user.', (done) => {
    const newuser = { username: 'test', lastname: 'test', email: 'test@gmail.com', address: 'test 123', phone: 123, password: 'test' }
    const server = makeServer();
    request(server)
      .post('/api/v1/userstest')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newuser)
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.a('string', 'Now you can log in.')
          done();
        }
      });
  });

  it('should not create user if email is already in use', (done) => {
    const newuser1 = { username: 'test', lastname: 'test', email: 'person2@gmail.com', address: 'test 123', phone: 123, password: 'test' }
    const server = makeServer();
    request(server)
      .post('/api/v1/userstest')
      .send(newuser1)
      .expect(417)
      .end(done);
  });
});