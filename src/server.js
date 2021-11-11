// server.js
const express = require('express');

// Define Express App
const app = express();
app.use(express.static('./public'));

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});