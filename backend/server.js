const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY',
  key_secret: 'YOUR_RAZORPAY_SECRET'
});

app.use(bodyParser.json());

app.post('/api/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount, // Amount in paise
    currency: 'INR',
    receipt: 'receipt#1'
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
