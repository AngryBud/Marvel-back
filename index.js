require("dotenv").config();
const express = require("express");
const formidable=require("express-formidable");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const CharactersRoute = require("./Routes/Characters");
const ComicsRoute = require("./Routes/Comics");

const UserRoute = require("./Routes/User");
const FavRoute = require("./Routes/Fav");

app.use(formidable());
app.use(express());
app.use(cors());
app.use(ComicsRoute);
app.use(CharactersRoute);
app.use(UsersRoute);
app.use(FavRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {res.status(200).json("Bienvenue sur l'Api Marvel")});

app.get("*", (req,res)=>{res.status(200).json("Page not found")});

app.listen(process.env.PORT, () => console.log("server started"));