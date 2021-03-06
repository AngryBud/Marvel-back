const express = require("express");
const axios = require("axios");
const router = express.Router();
// sdf
router.get("/comics", async (req, res) => {
    try{
        const comics = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics`,
        {
            params: {
              apiKey: process.env.API_KEY,
              title: req.query.name,
              skip: (req.query.page - 1) * 100,
              limit: req.query.limit
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


// router.get("/comics/:comicId", async (req, res) => {

//     const apiKey = process.env.API_KEY;
//     const comicId = req.params.characterId;
//     try{
//         const character = await axios.get(
//         `https://lereacteur-marvel-api.herokuapp.com/comics/${charId}?apiKey=${apiKey}`);
//         // &title=${title}&limit=${limit}&skip=${skip}`);
//         res.status(200).json(character.data);
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// });

module.exports = router;