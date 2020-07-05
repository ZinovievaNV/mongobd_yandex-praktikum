const Card = require('../models/card');

module.exports = {
  getCards(req, res) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((card) => res.send({ data: card }))
      .catch((error) => res.status(500).send({ message: `Произошла ошибка ${error}` }));
  },
  createCard(req, res) {
    const { name, link } = req.body;
    // eslint-disable-next-line no-underscore-dangle
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send({ data: card }))
      .catch((error) => res.status(500).send({ message: `Произошла ошибка ${error}` }));
  },

  deleteCardById(req, res) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail(new Error('Карточка не найдена'))
      .then((card) => res.send({ data: card, message: 'Карточка удалена' }))
      .catch((error) => res.status(500).send({ message: `${error.message}` }));
  },

  likeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      // eslint-disable-next-line no-underscore-dangle
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Карточка не найдена'))
      .then(() => res.send({ message: 'Карточка like' }))
      .catch((error) => res.status(500).send({ message: `${error.message}` }));
  },
  dislikeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      // eslint-disable-next-line no-underscore-dangle
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Карточка не найдена'))
      .then(() => res.send({ message: 'Карточка dislike' }))
      .catch((error) => res.status(500).send({ message: `${error.message}` }));
  },
};
