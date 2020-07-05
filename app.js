const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const path = require('path');
const bodyParser = require('body-parser');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    // eslint-disable-next-line no-underscore-dangle
    _id: '5efb9fd6292c5605a49793d9',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.all('*', (req, res, next) => {
  if (req.method !== 'GET' || req.url !== '/') {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    next();
  }
});

start();
