const usersRouter = require('express').Router();
const { getUsers, createUser, getUserById } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
