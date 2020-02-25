const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.MONGODBURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(db => console.log(`MongoDb connected`), err => console.log(`Error connecting to MongoDb`, err))

const port = process.env.PORT || 9994
app.listen(port,()=>{
    console.log(`Server is launched at launchpad ${port}`)
})