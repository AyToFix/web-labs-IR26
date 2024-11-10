document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо ID з URL
    const urlParams = new URLSearchParams(window.location.search);
    const printerId = urlParams.get('id');

    // Отримуємо принтери з localStorage
    let printers = JSON.parse(localStorage.getItem('printers')) || [];

    // Знаходимо принтер за ID
    const printerToEdit = printers.find(printer => printer.id === printerId);

    // Заповнюємо форму існуючими значеннями
    if (printerToEdit) {
        document.getElementById('name_input').value = printerToEdit.name;
        document.getElementById('speed_input').value = printerToEdit.speed;
        document.getElementById('price_input').value = printerToEdit.price;
        document.getElementById('description_input').value = printerToEdit.description;
    }

    // Обробник події на кнопку "Save"
    document.getElementById('save_button').addEventListener('click', (e) => {
        e.preventDefault();

        // Оновлюємо дані принтера
        const updatedPrinter = {
            id: printerId,
            name: document.getElementById('name_input').value,
            speed: document.getElementById('speed_input').value,
            price: document.getElementById('price_input').value,
            description: document.getElementById('description_input').value,
        };

        // Оновлюємо принтер у списку printers
        const printerIndex = printers.findIndex(printer => printer.id === printerId);
        if (printerIndex !== -1) {
            printers[printerIndex] = updatedPrinter;

            // Зберігаємо оновлений список у localStorage
            localStorage.setItem('printers', JSON.stringify(printers));

            // Перенаправляємо на головну сторінку
            window.location.href = 'index.html';
        }
    });
});
