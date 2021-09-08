const { Router } = require('express');
const db = require('../src/database');
const users = [{
  email: "person2@gmail.com",
  password: "person1PASSWORD",

}, {
  email: "person1@gmail.com",
  password: "person2PASSWORD",

}];
function makeRouter() {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const User = db.getModel('User');
      const data = {
        username: req.body.username,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password,
      };
      for (let usuario of users) {
        if (data.email !== usuario.email) {
          await users.push(data);
          res.status(201).json('Now you can log in.');
          return
        } else {
          res.status(417).send('email is already in use');
        }
      }
    } catch (error) {
      res.status(417).send('You need to complete all the information.' + msj);
    }
  });

  return router;
}

module.exports = {
  makeRouter, users,
};