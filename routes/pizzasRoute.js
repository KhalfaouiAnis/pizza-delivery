const { Router } = require("express");
const Pizza = require("../models/pizzaModel");
const router = Router();

router.get("/all-pizza", async (req, res) => {
  try {
    const pizzas = await Pizza.find({}).sort({ _id: -1 });
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(404);
    throw new Error("cannot fetch data");
  }
});

router.post("/get-pizza-by-id", async (req, res) => {
  const { pizzaid } = req.body;
  try {
    const pizza = await Pizza.findOne({ _id: pizzaid });
    res.status(200).json(pizza);
  } catch (err) {
    res.status(404);
    throw new Error("Pizza not found");
  }
});

router.post("/add-pizza", async (req, res) => {
  const {
    pizza: { name, image, description, category, prices },
  } = req.body;

  const newPizza = new Pizza({
    name,
    image,
    description,
    varients: ["small", "medium", "large"],
    category,
    prices: [prices],
  });
  try {
    await newPizza.save();
    res.status(200).json({ message: "New Pizza Added" });
  } catch (err) {
    res.status(404);
    throw new Error("Something went wrong");
  }
});

router.post("/edit-pizza", async (req, res) => {
  const { updatedPizza } = req.body;

  const { _id, name, image, description, category, prices } = updatedPizza;
  try {
    const pizza = await Pizza.findOne({ _id });
    pizza.name = name;
    pizza.image = image;
    pizza.description = description;
    pizza.category = category;
    pizza.prices = [prices];

    await pizza.save();
    res.status(200).json({ updatedPizzaId: _id });
  } catch (err) {
    res.status(404);
    throw new Error("Something went wrong");
  }
});

router.post("/delete-pizza", async (req, res) => {
  const { pizzaId } = req.body;
  try {
    await Pizza.findOneAndDelete({ _id: pizzaId });
    res.status(200).json({ deletedPizzaId: pizzaId });
  } catch (err) {
    res.status(404);
    throw new Error("Something went wrong");
  }
});

module.exports = router;
