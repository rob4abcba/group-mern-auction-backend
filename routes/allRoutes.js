const express = require("express");
const allRouter = express.Router();
const multer = require("multer");
let getFields = multer();

// module.exports = { AuctionItems, Users, Bids };
// module.exports = { AuctionItemsModel, UsersModel, BidsModel, EntriesModel };
module.exports = { AuctionItemsModel, UsersModel, BidsModel };

// const { AuctionItems, Users, Bids } = require("../models/allSchemas");
const {
  AuctionItemsModel,
  UsersModel,
  BidsModel,
  // EntriesModel,
} = require("../models/allSchemas");

//To add a new auctionItem.
allRouter.post("/additem", getFields.none(), async (request, response) => {
  const newAuctionItem = new AuctionItemsModel(request.body);
  let user = await newAuctionItem.save();
  user = user.toObject();
  // console.log(request);
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To get all the existing auctionItems.
allRouter.get("/", async (request, response) => {
  // const auctionItemsData = await AuctionItems.find({});
  const auctionItemsData = await AuctionItemsModel.find({});
  try {
    response.send(auctionItemsData);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To add a new user.
allRouter.post("/signup", getFields.none(), async (request, response) => {
  // const newUser = new Users(request.body);
  const newUser = new UsersModel(request.body);

  let user = await newUser.save();
  user = user.toObject();
  console.log("request =", request);
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To authenticate the user
allRouter.post("/login", getFields.none(), async (request, response) => {
  console.log(request.body);
  // let user = await Users.findOne({
  let user = await UsersModel.findOne({
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

//To add a new bid.
allRouter.post("/newbid", getFields.none(), async (request, response) => {
  // const newBid = new Bids(request.body);
  const newBid = new BidsModel(request.body);
  let bid = await newBid.save();
  bid = bid.toObject();
  try {
    response.send(bid);
  } catch (error) {
    response.status(500).send(error);
  }
});

//To get all the existing bids.
allRouter.get("/allbids", async (request, response) => {
  // const bidData = await Bids.find({});
  const bidData = await BidsModel.find({});
  try {
    response.send(bidData);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = allRouter;
