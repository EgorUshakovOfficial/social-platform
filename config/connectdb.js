const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGO_URI)
    .then(db => console.log("Application is successfully connected to MongoDB"))
    .catch(err => console.log("Error! Something went wrong!"))
