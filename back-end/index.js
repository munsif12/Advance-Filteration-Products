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
  console.log(page + " " + limit);
  console.log(req.query);
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
  //fields to be returned
  //   const pageNo = page;
  //   const limitTo = limit;
  //   console.log(pageNo + "" + limitTo);
  //   const skip = (pageNo - 1) * limit;
  //   user = user.skip(skip).limit(Number(limitTo));
  //   const totalDocuments = await userDetails.countDocuments();

  user = await user;
  res.json(user);
});

//create listner request for the home <page>
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
