require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const comicsRoute = require("./Routes/Comics");
const mongoose = require("mongoose");
const charactersRoute = require("./Routes/Characters");

app.use(express());
app.use(cors());
app.use(comicsRoute);
app.use(charactersRoute);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.get("/", (req, res) => {res.status(200).json("Bienvenue sur l'Api Marvel")});

app.get("*", (req,res)=>{res.status(200).json("Page not found")});

app.listen(process.env.PORT, () => console.log("server started"));