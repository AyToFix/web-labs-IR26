import { addItemToPage } from './dom_util.js';

const itemsContainer = document.getElementById("items_container");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_button");
const searchInput = document.getElementById("search_input");
const sortSelect = document.getElementById("sort_select");
const totalPriceButton = document.getElementById("total_button");
const totalPriceDisplay = document.getElementById("total_price_display");

let printers = JSON.parse(localStorage.getItem('printers')) || [];
let displayedPrinters = [...printers]; 

function renderItemsList(printerList) {
  itemsContainer.innerHTML = ""; 
  printerList.forEach((printer) => {
    addItemToPage(printer, removePrinter); 

    // Додаємо функціонал для кнопки "Edit"
    document.querySelector(`#edit_button_${printer.id}`).addEventListener('click', () => {
        window.location.href = `edit.html?id=${printer.id}`;
    });
  });
}


function updateTotalPrice(printerList) { 
  const totalPrice = printerList.reduce((sum, printer) => sum + Number(printer.price), 0);
  totalPriceDisplay.textContent = `Загальна ціна: ${totalPrice} UAH`;
}

function removePrinter(id) {
  printers = printers.filter((printer) => printer.id !== id);
  
  localStorage.setItem('printers', JSON.stringify(printers));
  displayedPrinters = [...printers]; 
  renderItemsList(printers);
}

document.addEventListener('DOMContentLoaded', () => {
  renderItemsList(printers); 
});

findButton.addEventListener("click", (e) => {
  e.preventDefault(); 
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    displayedPrinters = printers.filter((printer) =>
      printer.name.toLowerCase().includes(searchTerm)
    );
    renderItemsList(displayedPrinters);
  }
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  displayedPrinters = [...printers]; 
  renderItemsList(printers);
});

sortSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;

  if (sortBy === "name") {
    displayedPrinters.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "price") {
    displayedPrinters.sort((a, b) => b.price - a.price);
  }

  renderItemsList(displayedPrinters);
});

totalPriceButton.addEventListener("click", () => {
  updateTotalPrice(displayedPrinters); 
});
