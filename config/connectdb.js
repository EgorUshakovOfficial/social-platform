const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGO_URI)
    .then(db => {
        console.log("Application is successfully connected to MongoDB database")
    })
    .catch(err => {
        console.log("Error! Applications is not connected to MongoDB database")
    })

