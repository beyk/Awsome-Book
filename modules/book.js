export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  }

  add() {
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;

    if (titleInput && authorInput) {
      const book = { title: titleInput, author: authorInput };
      this.bookList.push(book);
      this.saveToLocalStorage();
      this.displayInfo();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  }

  displayInfo() {
    this.updateBookListFromLocalStorage();

    const bookShelf = document.getElementById('bookShelf');
    bookShelf.innerHTML = '';

    this.bookList.forEach((book, index) => {
      const bookRow = this.createBookRow(book, index);
      bookShelf.appendChild(bookRow);
    });
  }

  createBookRow(book, index) {
    const bookRow = document.createElement('div');
    bookRow.classList.add('book-row');
    bookRow.innerHTML = `<p class="title-p">"${book.title}" By: ${book.author}</p>`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.innerHTML = '<b>Remove</b>';
    removeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.remove(index);
    });

    bookRow.appendChild(removeButton);
    return bookRow;
  }

  updateBookListFromLocalStorage() {
    const bookListFromLocalStorage = JSON.parse(localStorage.getItem('bookList'));
    if (bookListFromLocalStorage) {
      this.bookList = bookListFromLocalStorage;
    }
  }

  remove(index) {
    if (index >= 0 && index < this.bookList.length) {
      this.bookList.splice(index, 1);
      this.saveToLocalStorage();
      this.displayInfo();
    }
  }
}
