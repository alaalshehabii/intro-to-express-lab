const express = require('express');
const app = express();
// Loading Express

// ======================== 1. Greetings ========================
app.get('/greetings/:userName', (req, res) => {
  const { userName } = req.params;
  res.send(`Hello there, ${userName}!`);
});

// ======================== 2. Rolling the Dice ========================
app.get('/roll/:maxNumber', (req, res) => {
  const { maxNumber } = req.params;
  const parsedNumber = parseInt(maxNumber, 10);

  if (isNaN(parsedNumber)) {
    return res.send("You must specify a number.");
  }

  const rolledNumber = Math.floor(Math.random() * (parsedNumber + 1));
  res.send(`You rolled a ${rolledNumber}.`);
});

// ======================== 3. Collectibles ========================
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:itemIndex', (req, res) => {
  const { itemIndex } = req.params;
  const index = parseInt(itemIndex, 10);
  const item = collectibles[index];

  if (!item) {
    return res.send("This item is not yet in stock. Check back soon!");
  }

  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// ======================== 4. Shoes with Query Parameters ========================
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = [...shoes];

  if (req.query.minPrice) {
    const minPrice = parseFloat(req.query.minPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (req.query.maxPrice) {
    const maxPrice = parseFloat(req.query.maxPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (req.query.type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
  }

  res.send(filteredShoes);
});

// ======================== Start the Server ========================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});