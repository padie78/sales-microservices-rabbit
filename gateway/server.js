const express = require('express');
const axios = require('axios');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200',
}));
app.use(express.json()); // para parsear JSON

app.post('/orders', async (req, res) => {
  try {
    const order = req.body;

    const response = await axios.post('http://orders:3000/orders', { item: order.item, quantity: order.quantity });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al reenviar orden:', error.message);
    res.status(500).json({ error: 'Error al procesar la orden' });
  }
});


app.listen(3003, () => {
  console.log('API Gateway corriendo en http://localhost:3003');
});
