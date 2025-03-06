const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");

router.get("/", function(req,res)
{
  let error = req.flash("error");

  res.render("index", {error});
});
router.get("/shop", isLoggedin, async function(req, res)
{
  let products = await  productModel.find();
  res.render("shop", {products});
})


module.exports = router;