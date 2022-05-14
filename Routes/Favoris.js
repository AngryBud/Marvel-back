
const express = require("express");
const router = express.Router();
const Fav = require("../models/Fav");
const User = require("../models/User");
const validateToken = require("../middlewares/validateToken");

router.post("/favoris/add", async(req,res) =>{
    
    try{
        const {name,description, image} = req.fields;

        const ownerExist = await User.findOne({token: req.headers.authorization.replace("Bearer ", "")})
        const newFavori = new Fav ({
            name: name,
            description: description,
            image: image,

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