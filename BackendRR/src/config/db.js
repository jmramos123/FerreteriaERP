const mongoose = require('mongoose');
const env = require('./env');

async function connectDb() {
  if (!env.mongoUri) {
    return null;
  }

  return mongoose.connect(env.mongoUri);
}

module.exports = {
  connectDb,
};
