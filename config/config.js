require('dotenv').config();
module.exports = {
    mongo: {
        uri: process.env.MONGOURI
    }
};
