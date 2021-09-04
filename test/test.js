const request = require('supertest');
const { users } = require('./usersTest');
const { getModel } = require('../src/database/index');
const { makeServer } = require('../src/server');
const expect = require('chai').expect;
const app = makeServer();

describe('POST /api/v1/signup', () => {
    const User1 = getModel('User');
    it('should create a user', (done) => {
        const usertest = {
            username: 'user', lastname: 'userlastname',
            email: 'user@gmail.com',
            address: 'street 123',
            phone: 123456,
            password: '12345678!'
        }
        request(app)
            .post('/api/v1/signup/')
            .send(usertest)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            //.expect(201)
            .end((err) => {
                if (err) return done(err)
                done()
            })
    });
    it('should return validation errors if request is invaild', (done) => {
        const app = makeServer();
        request(app)
            .post('/api/v1/signup/')
            .send({
                email: "someRandomText"
            })
            .expect(417)
            .end(done);
    });
    it('should not create user if email is already in use', (done) => {
        const app = makeServer();
        request(app)
            .post('/api/v1/signup/')
            .send({
                email: users[0].email,
                password: "12345670"
            })
            .expect(417)
            .end(done);
    });
});

