const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
 
const dataFilePath = path.join(__dirname, 'printers.json'); 
 
const readPrintersFromFile = () => { 
  if (fs.existsSync(dataFilePath)) { 
    const data = fs.readFileSync(dataFilePath); 
    return JSON.parse(data); 
  } 
  return []; 
}; 
 
const writePrintersToFile = (printers) => { 
  fs.writeFileSync(dataFilePath, JSON.stringify(printers, null, 2)); 
}; 
 
// Отримати всі принтери 
app.get('/api/printers', (req, res) => { 
  const printers = readPrintersFromFile(); 
  res.json(printers); 
}); 
 
// Додати новий принтер 
app.post('/api/printers', (req, res) => { 
  const newPrinter = { id: Date.now().toString(), ...req.body }; 
  const printers = readPrintersFromFile(); 
 
  if (printers.some(printer => printer.name === newPrinter.name)) { 
    return res.status(400).send('Printer with this name already exists'); 
  } 
 
  printers.push(newPrinter); 
  writePrintersToFile(printers); 
  res.status(201).json(newPrinter); 
}); 
 
// Оновити принтер 
app.put('/api/printers/:id', (req, res) => { 
  const { id } = req.params; 
  const updatedPrinter = req.body; 
  const printers = readPrintersFromFile(); 
  const index = printers.findIndex(printer => printer.id === id); 
 
  if (index !== -1) { 
    printers[index] = { ...printers[index], ...updatedPrinter }; 
    writePrintersToFile(printers); 
    res.json(printers[index]); 
  } else { 
    res.status(404).send('Printer not found'); 
  } 
}); 
 
// Видалити принтер 
app.delete('/api/printers/:id', (req, res) => { 
  const { id } = req.params; 
  const printers = readPrintersFromFile(); 
  const index = printers.findIndex(printer => printer.id === id); 
 
  if (index !== -1) { 
    printers.splice(index, 1); 
    writePrintersToFile(printers); 
    res.status(204).send(); 
  } else { 
    res.status(404).send('Printer not found'); 
  } 
}); 
 
// Пошук принтерів 
app.get('/api/printers/search', (req, res) => { 
  const query = req.query.query.toLowerCase(); 
  const printers = readPrintersFromFile(); 
  const filteredPrinters = printers.filter(printer => 
    printer.name.toLowerCase().includes(query) || 
    printer.description.toLowerCase().includes(query) 
  ); 
  res.json(filteredPrinters); 
}); 
 
// Отримати загальну ціну 
app.get('/api/printers/total', (req, res) => { 
  const printers = readPrintersFromFile(); 
  const totalPrice = printers.reduce((sum, printer) => sum + Number(printer.price), 0); 
  res.json({ totalPrice }); 
}); 
 
// Сортування принтерів 
app.get('/api/printers/sort', (req, res) => { 
  const { sortBy } = req.query; 
  const printers = readPrintersFromFile(); 
 
  const sortedPrinters = printers.sort((a, b) => { 
    if (sortBy === 'name') { 
      return a.name.localeCompare(b.name); 
    } else if (sortBy === 'price') { 
      return parseFloat(b.price) - parseFloat(a.price); 
    } 
    return 0; 
  }); 
 
  res.json(sortedPrinters); 
}); 
 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});

