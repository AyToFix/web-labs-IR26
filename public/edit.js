document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const printerId = urlParams.get('id');
  
    const response = await fetch(`/api/printers`);
    const printers = await response.json();
    const printerToEdit = printers.find(printer => printer.id === printerId);
  
    if (printerToEdit) {
      document.getElementById('name_input').value = printerToEdit.name;
      document.getElementById('speed_input').value = printerToEdit.speed;
      document.getElementById('price_input').value = printerToEdit.price;
      document.getElementById('description_input').value = printerToEdit.description;
    }
  
    document.getElementById('save_button').addEventListener('click', async (e) => {
      e.preventDefault();
  
      const updatedPrinter = {
        id: printerId,
        name: document.getElementById('name_input').value,
        speed: document.getElementById('speed_input').value,
        price: document.getElementById('price_input').value,
        description: document.getElementById('description_input').value,
      };
  
      await fetch(`/api/printers/${printerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrinter),
      });
  
      window.location.href = 'index.html';
    });
  });
  