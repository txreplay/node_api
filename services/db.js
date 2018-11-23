const mongoose = require('mongoose');

const initClient = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
        console.log('Mongoose is connected');
    }, (error) => {
        console.log('ERROR - Mongoose is not connected');
        console.error(error);
    });
};

module.exports = {initClient};