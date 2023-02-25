const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.set({
  strictQuery: false,
});

module.exports = () => mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
