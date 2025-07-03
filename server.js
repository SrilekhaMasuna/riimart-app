const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, '0.0.0.0', () => {
    console.log("✅ Server running at http://192.168.43.153:5000");
});
