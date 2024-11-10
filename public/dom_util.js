const itemTemplate = ({ id, name, speed, price, description }) => ` 
<li id="${id}" class="card mb-3 item-card" draggable="true"> 
    <img src="printer.png" class="item-container__image card-img-top" alt="Принтер"> 
    <div class="card-body"> 
        <h5 class="card-title">${name}</h5> 
        <p class="card-text">Speed: ${speed} p/min, Price: ${price} UAH</p> 
        <p class="card-text">Description: ${description ? description : 'Немає опису'}</p> 
        <button id="edit_button_${id}" class="btn btn-primary mt-2">Edit</button> 
        <button id="delete_button_${id}" class="btn btn-danger mt-2 ms-3">Remove</button> 
    </div> 
</li>`; 
 
export const getInputValues = () => { 
    return { 
      name: document.getElementById("name_input").value, 
      speed: document.getElementById("speed_input").value, 
      price: parseInt(document.getElementById("price_input").value), 
      description: document.getElementById("description_input").value, 
    }; 
}; 
 
export const addItemToPage = ({ id, name, speed, price, description }, onRemove) => { 
  const itemHTML = itemTemplate({ id, name, speed, price, description }); 
  const itemsContainer = document.getElementById('items_container'); 
  itemsContainer.insertAdjacentHTML("beforeend", itemHTML); 
 
  const printerElement = document.getElementById(id); 
  const deleteButton = printerElement.querySelector(`#delete_button_${id}`); 
   
  deleteButton.addEventListener("click", () => { 
    printerElement.remove(); 
    onRemove(id); 
  }); 
}; 
 
export const clearInputs = () => { 
  document.getElementById("name_input").value = ''; 
  document.getElementById("speed_input").value = ''; 
  document.getElementById("price_input").value = ''; 
  document.getElementById("description_input").value = ''; 
}; 