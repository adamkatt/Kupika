require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require('mongoose')

const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", (error) => console.log("Connected to Database:", process.env.DATABASE_URL))

app.use(express.json())

const recipesRouter = require("./routes/recipes")
app.use("/recipes", recipesRouter)

app.listen(PORT, () => console.log('Server started on port', PORT))