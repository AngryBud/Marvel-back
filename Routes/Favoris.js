
const express = require("express");
const router = express.Router();
const Fav = require("../models/Fav");
const User = require("../models/User");

router.post("/favoris", async(req, res)=>{
    try{

        const fav = await Fav.find({token: req.fields.token});
        return res.status(200).json(fav);
        
    }catch(error){
        return res.status(400).json({error: {message: error.message}});
    }
})
router.post("/favoris/add", async(req,res) =>{
    
    try{
        const {name,description, image, token} = req.fields;
        const newFavori = new Fav ({
            name: name,
            description: description,
            image: image,
            token: token,

        });
        await newFavori.save();
        const ret = 
                {_id: newFavori._id,
                    name: name,
                    description: description,
                    image: image,

                    token: token
                    
                }
                // console.log("on passe la");
            return res.status(200).json(ret);
        // return res.status(200).json(newFavori);

    }catch(error){
        res.status(400).json(error.message);
    }
});

// router.post("/favoris/all", async(req, res)=>{
//     try{

//         const authoUser = await Fav.findOne({token:});
//         if (!authoUser)
//             return res.status(401).json("No account with this mail Please Signup !");
//         if (decrypt === authoUser.hash){
//             const ret = 
//                 {_id: authoUser._id,
//                     token: authoUser.token,
//                     account:{
//                         username: authoUser.account.username,
//                     state: "Connect with success"
//                 }}
//                 return res.status(200).json(ret);
//             }
//             else{
//                 return res.status(401).json("Invalid password");
//             }
        
//     }catch(error){
//         return res.status(400).json({error: {message: error.message}});
//     }
// }
module.exports = router;