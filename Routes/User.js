const express = require("express");
// const axios = require("axios");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User");

router.post("/user/signup", async(req,res) => {
    try{
        const alreadyMail = await User.findOne({email: req.fields.email});
        const alreadyUsername = await User.findOne({account: {username: req.fields.username}});
        if (alreadyMail)
            return res.status(400).json("This mail already exist");
        else if (req.fields.email.indexOf("@") === -1)
            return res.status(400).json("This mail is invalid");
        else if (alreadyUsername || req.fields.username === undefined)
            return res.status(400).json("This username already exist or is missing");
        else{
            const salt = uid2(32);
            const hash = SHA256(req.fields.password + salt).toString(encBase64);
            const token = uid2(32);
            const newAccount = new User ({
                email: req.fields.email,
                account: {
                    username: req.fields.username,
                },
                
                token: token,
                hash: hash,
                salt: salt
            })
            await newAccount.save();
            const ret = 
                {_id: newAccount._id,
                    token: newAccount.token,
                    account:{
                        username: newAccount.account.username,
                    statut: "Sign up successful"
                }}
            return res.status(200).json(ret);
        }
    }catch(error){
        return res.status(400).json({error: {message: error.message}});
    }
})

router.post("/user/login", async(req, res)=>{
    try{

        const authoUser = await User.findOne({email: req.fields.email});
        if (!authoUser)
            return res.status(401).json("No account with this mail Please Signup !");
        if (req.fields.password1 !== req.fields.password2)
            return res.status(401).json("Password and confirmation are different !");
        else{
            const decrypt = SHA256(req.fields.password + authoUser.salt).toString(encBase64);
            if (decrypt === authoUser.hash){
                const ret = 
                {_id: authoUser._id,
                    token: authoUser.token,
                    account:{
                        username: authoUser.account.username,
                    state: "Connect with success"
                }}
                return res.status(200).json(ret);
            }
            else{
                return res.status(401).json("Invalid password");
            }
        }
    }catch(error){
        return res.status(400).json({error: {message: error.message}});
    }
    // return res.status(200).json("login ok");
})

module.exports = router;