// Import required modules and models
const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");
router.get("/get", async (req, res) => {
  try {
    const { cartId } = req.params;

    // Find checkout data from MongoDB based on cartId
    const checkoutData = await Checkout.find({ cartId });

    if (!checkoutData || checkoutData.length === 0) {
      return res
        .status(404)
        .json({ message: "Checkout data not found for the provided cartId" });
    }

    res.status(200).json({ message: "Checkout data retrieved", checkoutData });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving checkout data",
      error: error.message,
    });
  }
});

// Route to handle the POST request for checkout
router.post("/add", async (req, res) => {
  console.log("got the response");
  try {
    const { pizzaName, quantity, price } = req.body;
    console.log(pizzaName, quantity, price);
    // Create a new instance of Checkout model
    const checkout = new Checkout({
      cartId,
      pizzaName,
      quantity,
      price,
    });
    console.log(checkout);
    // Save checkout data to MongoDB
    await checkout.save();

    res.status(201).json({ message: "Checkout successful", checkout });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
});

module.exports = router;
