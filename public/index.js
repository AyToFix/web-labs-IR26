import { addItemToPage } from './dom_util.js';
const API_URL = '/api/printers';

const itemsContainer = document.getElementById("items_container");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_button");
const searchInput = document.getElementById("search_input");
const sortSelect = document.getElementById("sort_select");
const totalPriceButton = document.getElementById("total_button");
const totalPriceDisplay = document.getElementById("total_price_display");

let allPrinters = [];
let displayedPrinters = [];

async function fetchPrinters() {
  const response = await fetch('/api/printers');
  const printers = await response.json();
  allPrinters = [...printers];
  displayedPrinters = [...printers];
  renderItemsList(displayedPrinters);
}

function renderItemsList(printerList) {
  itemsContainer.innerHTML = "";
  printerList.forEach((printer) => {
    addItemToPage(printer, removePrinter);
    document.querySelector(`#edit_button_${printer.id}`).addEventListener('click', () => {
      window.location.href = `edit.html?id=${printer.id}`;
    });
  });
}

async function removePrinter(id) {
  const response = await fetch(`/api/printers/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    displayedPrinters = displayedPrinters.filter(printer => printer.id !== id);
    renderItemsList(displayedPrinters);
  } else {
    console.error("Помилка видалення принтера з серверу.");
  }
}

findButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  const response = await fetch(`/api/printers/search?query=${searchTerm}`);
  displayedPrinters = await response.json();
  renderItemsList(displayedPrinters);
});

cancelButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const response = await fetch('/api/printers');
  const printers = await response.json();
  allPrinters = [...printers];
  displayedPrinters = [...printers];
  searchInput.value = "";
  renderItemsList(displayedPrinters);
});

sortSelect.addEventListener("change", async () => {
  const sortBy = sortSelect.value;
  const response = await fetch(`/api/printers/sort?sortBy=${sortBy}`);
  displayedPrinters = await response.json(); // отримуємо відсортований список від сервера
  renderItemsList(displayedPrinters); // оновлюємо відображення на сторінці
});

totalPriceButton.addEventListener("click", async () => { 
  const response = await fetch('/api/printers/total');
  const { totalPrice } = await response.json(); 
  totalPriceDisplay.textContent = `Загальна ціна: ${totalPrice} UAH`;
});

document.addEventListener('DOMContentLoaded', fetchPrinters);
