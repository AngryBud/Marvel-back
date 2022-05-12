const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/characters", async (req, res) => {
    try{
        const character = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters`,
        {
            params: {
              apiKey: process.env.API_KEY,
              name: req.query.name,
              skip: (req.query.page - 1) * 100,
              limit: req.query.limit
            },
        }
        )
        res.status(200).json(character.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get("/character/:characterId", async (req, res) => {

    const apiKey = process.env.API_KEY;
    const charId = req.params.characterId;
    try{
        const character = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${charId}?apiKey=${apiKey}`);
        // &title=${title}&limit=${limit}&skip=${skip}`);
        res.status(200).json(character.data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;