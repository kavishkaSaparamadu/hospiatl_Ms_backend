const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;

connection.on("Connected",() =>{
    console.log("Mongodb is connection is Successful");
})

connection.on("error",(error) =>{
    console.log("Error in Mongoose connection", error);
})


module.exports=mongoose;