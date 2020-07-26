const Card = require('../models/card');

module.exports = {
  getCards(req, res) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((card) => res.send({ data: card }))
      .catch((error) => res.status(500).send({ message: `${error.message}` }));
  },
  createCard(req, res) {
    const { name, link } = req.body;
    // eslint-disable-next-line no-underscore-dangle
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send({ data: card }))
      .catch((error) => res.status(400).send({ message: `${error.message}` }));
  },

  deleteCardById(req, res) {
    Card.findOneAndDelete({ _id: req.params.cardId })
      .orFail(() => Error('Карточка не найдена'))
      .then((card) => res.send({ data: card, message: 'Карточка удалена' }))
      .catch((error) => res.status(404).send({ message: `${error.message}` }));
  },

};
