require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;


const app = express();

mongoose.connect(mongoString);

const PORT = process.env.PORT;
const registerRoute = require('./src/route/route')


app.use(bodyParser.json()); 

app.use('/', registerRoute);

app.use((err, req, res, next) => { 
    res.json({ message: "something went wrong", err: err?.message });
    return;
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  