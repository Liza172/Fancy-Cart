const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", function(req, res)
{
  res.send("Hey Its working");
});
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == "development")
{
  router.post("/create", async function(req,res)
  {
   let owners = await ownerModel.find();
   if(owners.length > 0)
   {
    return res.status(401).send("You dont have permission to creare a new owner");
   }
    let {fullname, email, password} = req.body;
   let createdOwner = await ownerModel.create
   ({
      fullname,
      email ,
      password,
   })
   res.send(createdOwner);
  })
}



module.exports = router;