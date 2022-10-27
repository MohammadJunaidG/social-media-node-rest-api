const express = require('express')
const app = express();
const mongoose = require('mongoose');
const helmet = require("helmet");
const morgan = require("morgan");
const dbConfig = require('./configs/db.config')
const serverConfig = require('./configs/server.config')
//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on('error', ()=>{
    console.log("Error while connection with MongoDB")
});
db.once('open', ()=>{
    console.log("Connceted with mongoDB.")
})



require("./routes/auth.route")(app)
require("./routes/users.route")(app)
require("./routes/posts.route")(app)

app.listen(serverConfig.PORT, () =>{
    console.log(`Applicaiton server started at port number ${serverConfig.PORT}.`)
})