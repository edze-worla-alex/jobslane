const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://mighty:mightymongodb@127.0.0.1:27017/thejobber');
mongoose.connection.once('open', () => {
    console.log('Succesfully connected to database');
});