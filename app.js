// Book Contructor
function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI (){};
UI.prototype.addBookToList = function (book){
const list = document.getElementById('book-list');
const row = document.createElement('tr'); // Create tr element
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
    `;                                          //  Insert cols
list.appendChild(row);
}
// Show Alert
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div'); // Create div
    div.className = `alert ${className}`; // Add Classes
    div.appendChild(document.createTextNode(message)) //Add Text
    const container = document.querySelector('.container'); // Get Parent
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form); // Insert Alert

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}
// Clear fields
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
// Event Listeners
document.getElementById('book-form').addEventListener('submit', 
function (e) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

const book = new Book (title, author, isbn);  // Instanciate Book 
const ui = new UI();  // Instanciate UI
if (title === '' || author === '' || isbn === '') { 
   ui.showAlert('Please fill in all fields');
} else {
    ui.addBookToList(book);  // Add book to list
    ui.showAlert('Bood Added!', 'success'); // Show success
    ui.clearField(); // Clear fields
}

    e.preventDefault();
});       