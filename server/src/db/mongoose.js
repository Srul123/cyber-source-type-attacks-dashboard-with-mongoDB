const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cyber-sources', {
    useNewUrlParser: true,
})

console.log("MongoDB connection state: " + mongoose.connection.readyState);
