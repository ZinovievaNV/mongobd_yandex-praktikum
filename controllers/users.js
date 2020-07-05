const User = require('../models/user');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  },

  createUser(req, res) {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((error) => res.status(500).send({ message: `Произошла ошибка ${error}` }));
  },

  getUserById(req, res) {
    User.findById(req.params.userId)
      .orFail(new Error('Пользователь не найден'))
      .then((user) => res.send({ data: user }))
      .catch((error) => {
        res.status(404).send({ message: `${error.message}` });
      });
  },

};
