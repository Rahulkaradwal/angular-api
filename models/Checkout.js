// models/Checkout.js

const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  pizzaName: { type: String },
  quantity: { type: String },
  price: { type: String },
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
