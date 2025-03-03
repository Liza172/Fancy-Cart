const userModel = require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async function (req, res)
{
  try{
    let {email, fullname, password} = req.body;
    let user = await userModel.findOne({email : email})
    if(user)
      return res.status(401).send("You already have an account....please Login.")

    bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, async function(err, hash)
    {
      if(err)
        return res.send(err.message);
      else
      {
        let user = await userModel.create({
          email, 
          fullname,
          password : hash,
        });
        // res.send(user);
      

      let token = generateToken(user);
      res.cookie("token", token);
      res.send("Cookie is set")
      }
      
    })
    })
   
  } catch (err)
  {
    res.send(err.message);
  }
}

module.exports.loginUser = async function(req, res){
  let {email, password} = req.body;
  let user = await userModel.findOne({email : email})
  if(!user)
    return res.send("Email or passwor incorrect");

  bcrypt.compare(password, user.password, function(err, result){
    if(result)
    {
      let token = generateToken(user);
      res.cookie("token", token);
      res.send("You can login")
    }
    else
    {
      return res.send("Email or passwor incorrect");
    }
  })
}