const express = require("express");
const allRouter = express.Router();
const multer = require("multer");
let getFields = multer();

// module.exports = { AuctionItems, Users, Bids };
const { AuctionItems, Users, Bids } = require("../models/allSchemas");

//To get all the auctionItems information
allRouter.get("/", async (request, response) => {
  const auctionItemsData = await AuctionItems.find({});
  try {
    response.send(auctionItemsData);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To store the user data.
allRouter.post("/signup", getFields.none(), async (request, response) => {
  const newuser = new Users(request.body);
  let user = await newuser.save();
  user = user.toObject();
  // console.log(request);
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To authenticate the user
allRouter.post("/login", getFields.none(), async (request, response) => {
  console.log(request.body);
  let user = await Users.findOne({
    email: request.body.email,
    password: request.body.password,
  });

  try {
    if (user) response.send(user);
    else response.send("Authentication Failed");
  } catch (error) {
    response.status(500).send(error);
  }
});

//To store the bid data.
allRouter.post("/register", getFields.none(), async (request, response) => {
  const newBid = new Bids(request.body);
  let bid = await newBid.save();
  bid = bid.toObject();
  try {
    response.send(bid);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To get all the bid information
allRouter.get("/allbids", async (request, response) => {
  const bidData = await Bids.find({});
  try {
    response.send(bidData);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = allRouter;
