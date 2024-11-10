import { clearInputs, getInputValues } from './dom_util.js';

const createForm = document.getElementById('create_form');
createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const { name, speed, price, description } = getInputValues();
    const id = `printer_${Date.now()}`;
    const printer = { id, name, speed, price: Number(price), description };

    addPrinterToStorage(printer);
    clearInputs();
    window.location.href = 'index.html'; 
});

function addPrinterToStorage(printer) {
    const printers = JSON.parse(localStorage.getItem('printers')) || [];
    printers.push(printer); 
    localStorage.setItem('printers', JSON.stringify(printers)); 
}

