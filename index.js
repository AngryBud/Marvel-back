require("dotenv").config();
const express = require("express");
const formidable=require("express-formidable");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const comicsRoute = require("./Routes/Comics");
const charactersRoute = require("./Routes/Characters");
const usersRoute = require("./Routes/Users");

app.use(formidable());
app.use(express());
app.use(cors());
app.use(comicsRoute);
app.use(charactersRoute);
app.use(usersRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {res.status(200).json("Bienvenue sur l'Api Marvel")});

app.get("*", (req,res)=>{res.status(200).json("Page not found")});

app.listen(process.env.PORT, () => console.log("server started"));