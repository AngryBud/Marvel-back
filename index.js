require("dotenv").config();
const express = require("express");
const formidable=require("express-formidable");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const charactersRoute = require("./Routes/characters");
const comicsRoute = require("./Routes/comics");

const userRoute = require("./Routes/user");
const favRoute = require("./Routes/fav");

app.use(formidable());
app.use(express());
app.use(cors());
app.use(comicsRoute);
app.use(charactersRoute);
app.use(userRoute);
app.use(favRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {res.status(200).json("Bienvenue sur l'Api Marvel")});

app.get("*", (req,res)=>{res.status(200).json("Page not found")});

app.listen(process.env.PORT, () => console.log("server started"));