const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

exports.register = async (req, res) =>{
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 8)
        }
        const user = await User.create(userObj);
        res.status(201).send(user)
    } catch (error) {
        console.log("#### error while user sign up #### ", error.message);
        res.status(500).send({
            message : "Internal server error while creating user."
        });        
    }
}

exports.login = async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(401).send({message: "Username or password not provided."})
    }
    
    const user = await User.findOne({email : req.body.email});
    if(!user){ return res.status(404).send({message: "User not found."}) }
    
    const password = bcryptjs.compareSync(req.body.password, user.password)
    if(!password) { return res.status(401).send({message: "Incorrect password."}) };
    
    res.status(200).send(user)
}