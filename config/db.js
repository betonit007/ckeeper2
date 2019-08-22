const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // get connect info from gloabl variables stored in default.json file under config

const connectDB = async () => {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => {
      console.err(err.message);
      process.exit(1);
    })
}

module.exports = connectDB;