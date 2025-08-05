
const mongoose = require('mongoose');

async function connectToDB(){
    // Connection of Clusters 
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    connectToDB
}