const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodb+srv://betonit007:Nyjets$41@contactkeeper-1ukv3.mongodb.net/test?retryWrites=true&w=majority'); // get connect info from gloabl variables stored in default.json file under config

const connectDB = async () => {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    })
}

module.exports = connectDB;