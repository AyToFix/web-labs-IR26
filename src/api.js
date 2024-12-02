const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const data = require('./printers.json');
app.use(express.json());

app.get('/api/printers', (req, res) => {
    res.json(data);
});

app.get('/api/printers/:id', (req, res) => {
    const { id } = req.params;
    const printer = data.find((el) => el.id === parseInt(id));
    if (printer) {
        res.json(printer);
    } else {
        res.status(404).json({ message: "Printer not found" });
    }
});

app.get('/api/header', (req, res) => {
    res.send({ message: "Header loaded" });
});

app.get('/api/navbar', (req, res) => {
    res.send({ message: "Navbar loaded" });
});

app.get('/api/hero', (req, res) => {
    res.send({ message: "Hero loaded" });
});

app.get('/api/footer', (req, res) => {
    res.send({ message: "Footer loaded" });
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
