const REACT_SERVER_URL = "http://localhost:3000"
const PORT = 3001;

require("dotenv").config()  
const express = require("express")
const app = express()
const mongoose = require('mongoose')

// We need to enable cross-origin resource sharing in order for the React and Express servers to communicate from the same machine
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", REACT_SERVER_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", (error) => console.log("Connected to Database:", process.env.DATABASE_URL))

app.use(express.json())

const recipesRouter = require("./routes/recipes")
app.use("/recipes", recipesRouter)

app.listen(PORT, () => console.log('Server started on port', PORT))