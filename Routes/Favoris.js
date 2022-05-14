
const express = require("express");
const router = express.Router();
const Fav = require("../models/Fav");
const User = require("../models/User");
const validateToken = require("../middlewares/validateToken");

router.post("/addFavoris",validateToken, async(req,res) =>{
    
    try{
        const {fav_name,fav_description, fav_image} = req.fields;

        const ownerExist = await User.findOne({token: req.headers.authorization.replace("Bearer ", "")})
        const newFavori = new Fav ({
            name: fav_name,
            description: fav_description,
            image: fav_image,

            owner: ownerExist

        });
        console.log("on passe la");
        console.log(newFavori);
       
        await newFavori.save();
        return res.status(200).json(newFavori);

    }catch(error){
        res.status(400).json(error.message);
    }
});

module.exports = router;