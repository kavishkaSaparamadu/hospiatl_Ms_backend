const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
// const dbConfig = require("./Config/dbConfig");

const usersRoute = require("./route/admin/users");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/user',usersRoute);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection =mongoose.connection;

connection.once("open",() =>{
    console.log("Mongodb is connection is Successful");
})
// .then(() => console.log("MongoDB connection successfully!"))
// .catch(err => console.error("MongoDB connection error:", err));

// app.use('/auth', routes);




app.listen(PORT,()=>{
  console.log(`Node server started at ${PORT}`)
});














{/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./route/routes');
app.use(express.json());
const usersRoute = require('./route/users');
const app = express();


app.use('/api/user',usersRoute);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connection successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/auth', routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});*/}
