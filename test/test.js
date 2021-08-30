const request = require('supertest');
const { users } = require('./usersTest');
const { createUserModel } = require('../src/database/models/users');
const { getModel } = require('../src/database/index');
const database = require('../src/database');
const { makeServer } = require('../src/server');
const { expect } = require('chai');
const sinon = require('sinon');

describe('POST /api/v1/signup', () => {
    const User1 = getModel('User');
    // const User = createUserModel();
    it('should create a user', (done) => {
        const app = makeServer();
        var username = "user";
        var lastname = "userlastname";
        var email = "user@gmail.com";
        var password = "12345678!";
        var address = "street 123";
        var phone = 123456
        request(app)
            .post('/api/v1/signup/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username, lastname, email, password, address, phone })
            //.expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).not.to.be.empty;
                //expect(res.body.email).to.be(email);
                done()
            })
            .end((err) => {
                if (err) {

                    return done(err)
                    //} else {/*
                    //expect(res.status).to.be(200);
                    // res.should.to.be.status(200);*/

                    //expect(res.body.id).not.ToBeNull();

                }
                /* User1.findOne({ email }).then((user) => {
                     expect(user).not.toBeNull();
                     expect(user.password).not.toBe(password);
                     done();
                 });*/
            });
    });
    it('should return validation errors if request is invaild', (done) => {
        const app = makeServer();
        request(app)
            .post('/api/v1/signup/')
            .send({
                email: "someRandomText"
            })
            .expect(500)
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
            .expect(500)
            .end(done);
    });
});

