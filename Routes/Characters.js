const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/characters", async (req, res) => {
    const apiKey = process.env.API_KEY;
    try{
        req.query.name?name=req.query.name: name = "";
        req.query.limit?limit=req.query.limit: limit = 100;
        req.query.skip? skip=req.query.skip: skip = 0;
        const character = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&limit=${limit}&skip=${skip}`);
        // &title=${title}&limit=${limit}&skip=${skip}`);
        console.log("sdfdsd",character.data);
        res.status(200).json(character.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get("/character/:characterId", async (req, res) => {

    const apiKey = process.env.API_KEY;
    const charId = req.params.characterId;
    try{
        // const {title, limit, skip} = req.query;
        // const title=req.query.tit
        const character = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${charId}?apiKey=${apiKey}`);
        // &title=${title}&limit=${limit}&skip=${skip}`);
        res.status(200).json(character.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;