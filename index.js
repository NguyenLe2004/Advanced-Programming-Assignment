const express = require('express')
const cors = require('cors')
const database = require("./firebase")
const bodyParser = require('body-parser');
const initRoutes = require('./src/router')
const { getDatabase, ref, child, get,set } = require("firebase/database");

require('dotenv').config()
const app = express()

// app.use(cors({
//     origin : "http://localhost:3001/",
//     credentials:true,
//     optionSuccessStatus:200,
//     methods : ['GET','POST', 'PUT', 'DELETE']
// }))

app.use(cors());
app.options('*',cors())

// convert fomat data from client 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT  
const listener = app.listen(PORT, () => {
  console.log("server is running on ",listener.address().port); 

})