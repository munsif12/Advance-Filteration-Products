//create a nodejs bilerplate
var express = require("express");
var Product = require("./model");
var app = express();
var connection = require("./db");
connection();
//import cors for cross origin requests
var cors = require("cors");
app.use(cors());
app.use(express.json());

//create a get request for the home page
app.get("/", async function (req, res) {
  const { sort, fields, page, limit, ...restQuery } = req.query;
  const query = JSON.stringify(restQuery);
  const addDollerSign = query.replace(
    /\b(gt|lt|lte|gte|in|all|regex|options)\b/g,
    (match) => `$${match}`
  );
  var user = Product.find(JSON.parse(addDollerSign));
  //sorting the products
  if (sort) {
    const sortOn = sort.split(",").join(" ");
    user = user.sort(sortOn);
  } else {
    user = user.sort("price -createdAt");
  }
  //pagination
  var pageNo = page || 1;
  var limitTo = limit || 3;
  console.log(pageNo + " " + limitTo);
  const skip = (pageNo - 1) * limit;
  user = user.skip(Number(skip)).limit(Number(limitTo));
  const totalDocuments = await Product.countDocuments();
  user = await user;
  res.json({ totalPages: Math.ceil(totalDocuments / limitTo), user });
});

//create listner request for the home <page>
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
