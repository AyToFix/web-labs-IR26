import { clearInputs, getInputValues } from './dom_util.js';

const createForm = document.getElementById('create_form');

createForm.addEventListener('submit', async (event) => {  event.preventDefault();
  const { name, speed, price, description } = getInputValues();  const printer = { name, speed, price: Number(price), description };
  const response = await fetch('/api/printers', {
    method: 'POST',    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(printer),  });

  if (response.ok) {
    clearInputs();    window.location.href = 'index.html';
    
  } else {    const errorText = await response.text();
    console.error("Error adding printer:", errorText);    alert("Помилка: " + errorText); 

  }});
