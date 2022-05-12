const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/comics", async (req, res) => {
    // const apiKey = process.env.API_KEY;
    try{
        // req.query.title?title=req.query.title: title = "";
        // req.query.limit?limit=req.query.limit: limit = 0;
        // req.query.skip? skip=req.query.skip: skip = 0;

        const comics = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics`,
        {
            params: {
              apiKey: process.env.API_KEY,
              title: req.query.name,
              skip: (req.query.page - 1) * 100,
            },
        });
        
        res.status(200).json(comics.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get("/comics/:characterId", async (req, res) => {

    const apiKey = process.env.API_KEY;
    const characterId = req.params.characterId;
    try{
        const comics = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`);
        console.log("comics_data",comics.data);
        res.status(200).json(comics.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;