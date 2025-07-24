
const mongoose = require('mongoose');

async function connectToDB(){
    // Connection of Clusters 
    await mongoose.connect("mongodb+srv://MuhammadAhsan:s-57BkrxzNgw-UK@cluster0.0numytz.mongodb.net/Saylani")
}

module.exports = {
    connectToDB
}