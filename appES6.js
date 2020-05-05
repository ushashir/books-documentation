// Book Contructor
function Book (title, author, isbn, publisher, year){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publisher = publisher;
    this.year = year;
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
        <td>${book.publisher}</td>
        <td>${book.year}</td>
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
    }, 2000);
}
// Delete Book prototype
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
// Clear fields
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('publisher').value = '';
    document.getElementById('year').value = '';
}

// Local Storage
class Store {
    // Get books
    static getBooks () {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    // display books
    static displayBooks () {
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        })
    }
    // add book
    static  addBook (book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    // Remove book
    static removeBook (isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//  DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners
document.getElementById('book-form').addEventListener('submit', 
function (e) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const publisher = document.getElementById('publisher').value;
    const year = document.getElementById('year').value;

// Instanciate Book
const book = new Book (title, author, isbn, publisher, year);   
const ui = new UI();  // Instanciate UI
if (title === '' || author === '' || isbn === '' || publisher === '' || year === '') { 
   ui.showAlert('Please fill in all fields');
} else {
    ui.addBookToList(book);  // Add book to list
    Store.addBook(book) // Add to store
    ui.showAlert('Bood Added!', 'success'); // Show success
    ui.clearField(); // Clear fields
}

    e.preventDefault();
});

// Event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI() //Instantiate UI
    ui.deleteBook(e.target); //Detete target
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent); // Remove from Local storage
    ui.showAlert('Book removed successfully', 'success') // Show delete alert
    e.preventDefault();
});       