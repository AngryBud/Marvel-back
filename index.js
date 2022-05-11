const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const comicsRoute = require("./Routes/Comics");
const charactersRoute = require("./Routes/Characters");

app.use(express());
app.use(cors());
app.use(comicsRoute);
app.use(charactersRoute);

app.get("/", (req, res) => {res.status(200).json("Bienvenue sur l'Api Marvel")});

app.get("*", (req,res)=>{res.status(200).json("Page not found")});

app.listen("4000", () => console.log("server started"));