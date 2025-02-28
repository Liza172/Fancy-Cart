const express = require("express")
const router = express.Router();
const userModel = require("../models/user-model")

router.get("/", function(req, res)
{
  res.send("Hey Its working");
})

router.post("/register", async function(req, res)
{
  try{
    let {email, fullname, password} = req.body;
    let user = await userModel.create({
      email, 
      fullname,
      password,
    });
    res.send(user);
  } catch (err)
  {
    res.send(err.message);
  }
})
module.exports = router;