// Made by Lipp for Odin Project
const myLibrary = [];

function Book(title, author, pages, read, id) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

// // Modal Dialog Box
const button = document.querySelector('#newbook');
const modal = document.querySelector('dialog');
button.onclick = function () {
  modal.showModal()
}

const libraryBody = document.querySelector('#book-list')
const form = modal.querySelector('form');

// Function to render the book on the page

function render() {
  libraryBody.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const li = document.createElement('li');
    li.classList.add('book');
    li.setAttribute('id', book.id);
    li.innerHTML = `
    <div class="bookbox-header">
    <h3 class="title">${book.title}</h3>
    <h5 class="author">by ${book.author}</h5>
    </div>
    <div class="bookbox-body">
    <p>${book.pages} pages</p>
    <p class="read-status">${book.read ? "Read" : "Not Read"}</p>
    <button class="remove-button" onclick="removeButton(${i})">Remove</button>
    <button class="read-button" onclick="readButton(${i})">Toggle Read</button>
    </div>
    `;
    libraryBody.appendChild(li);
  }
}

// Function to remove the book from the page

function removeButton(index) {
  myLibrary.splice(index, 1);
  render();
}

// Function to read the book or unread

Book.prototype.readButton = function () {
  this.read = !this.read;
}

function readButton(index) {
  myLibrary[index].readButton();
  render();
}

// Books for example in the website
const b1 = new Book('One Piece Receitas Piratas 01', 'Sanji', 93, "Read", 0);
const b2 = new Book('Berserk', 'Kentaro Miura', 696, "Not read", 1);
const b3 = new Book('The Anubis Gates', 'Tim Powers', 400, "Read", 2);

myLibrary.push(b1);
myLibrary.push(b2);
myLibrary.push(b3);
render();

// // Modal Form Data Getters
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read');

  const book = {
    title, author, pages, read: read ? "Read" : "Not Read", id: myLibrary.length,
  };

  myLibrary.push(book);
  render();
  form.reset();
  modal.close();
});