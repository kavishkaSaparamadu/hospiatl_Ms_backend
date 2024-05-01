const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');

const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({
 origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>{
  console.log("MongoDB connection successfully!");

});

const patientRouter =require("./route/pateints.js");
// const usersRouter = require("./route/users.js");
app.use("/pateint",patientRouter);
// app.use("/pateint",usersRouter);





app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`)

    });