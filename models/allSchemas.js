const mongoose = require("mongoose");

const AuctionItemSchema = new mongoose.Schema({
  //MG: More formal to include keyword 'new'
  _id: Number,
  title: String,
  category: String,
  description: String,
  startbid: Number,
  photo: String,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Rather Not Say"],
    default: "Rather Not Say",
  },
  role: {
    type: String,
    enum: ["participant", "admin"],
    default: "participant",
  },
});

const BidSchema = new mongoose.Schema({
  bname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// EntrySchema is exactly the same and redundant with AuctionItemSchema
// const EntrySchema = new mongoose.Schema({
//   //MG: More formal to include keyword 'new'
//   _id: Number,
//   title: String,
//   category: String,
//   description: String,
//   startbid: Number,
//   photo: String,
// });

const AuctionItemsModel = mongoose.model("AuctionItem", AuctionItemSchema);
const UsersModel = mongoose.model("User", UserSchema);
const BidsModel = mongoose.model("Bid", BidSchema);
// const EntriesModel = mongoose.model("Entry", EntrySchema);

// module.exports = { AuctionItemsModel, UsersModel, BidsModel, EntriesModel };
module.exports = { AuctionItemsModel, UsersModel, BidsModel };
