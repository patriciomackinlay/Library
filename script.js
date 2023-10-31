// MY LIBRARY ARRAY //

const myLibrary = [];

// BOOK CONSTRUCTOR AND BOOK ADDING FUNCTION //

function Book(title, author, pages, read, index) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read;
    }
    this.index = index;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

// DISPLAY BOOKS FROM MY LIBRARY //

const mainContainer = document.querySelector(".main-container");

function displayBooks(library) {
    // CLEAR BOOK CONTAINER //
    mainContainer.replaceChildren();
    let i = 0;
    myLibrary.forEach(Book => {
        // CREATE CARD FOR EACH BOOK IN LIBRARY //
        const card = document.createElement("div");
        card.classList.add("card");
        mainContainer.appendChild(card);
        // ADD TITLE, AUTHOR, PAGES AND READ STATUS TO CARD //
        const title = document.createElement("h2");
        title.textContent = Book.title;
        card.appendChild(title);

        const author = document.createElement("h3");
        author.classList.add("author");
        author.textContent = "By " + Book.author;
        card.appendChild(author);

        const pages = document.createElement("h3");
        pages.classList.add("pages");
        pages.textContent = Book.pages + " pages";
        card.appendChild(pages);

        const read = document.createElement("button");
        read.classList.add("read-button");
        read.setAttribute("id", i)
        if (Book.read) {
            read.textContent = "Read";
            read.classList.add("book-read");
        } else {
            read.textContent = "Not Read";
            read.classList.remove("book-read");
        }
        card.appendChild(read);

        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.classList.add("remove-button");
        removeButton.setAttribute("id",i);
        card.appendChild(removeButton);

        // REMOVE BUTTON AND READ TOGGLE CONFIGURATION //

        Book.index = i;
        i++;
        
        read.addEventListener("click", (e) => {
            if(e.target.textContent === "Read") {
                read.classList.remove("book-read");
                e.target.textContent = "Not Read";
                myLibrary[e.target.id].read = false;
            } else {
                e.target.textContent = "Read";
                read.classList.add("book-read");
                myLibrary[e.target.id].read = true;
            }
        })

        removeButton.addEventListener("click", (e) => {
            bookIndex = e.target.id;
            console.log(bookIndex);
            myLibrary.splice(bookIndex, 1);
            displayBooks(myLibrary);
        });
    });
}

// NEW BOOK BUTTON AND FORM //
const newBookForm = document.querySelector(".new-book-form")

const newBookDialog = document.querySelector("dialog");
const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close-form");
const submitButton = document.querySelector(".submit-button");
let inputs = document.querySelectorAll("input");

addButton.addEventListener("click", () => {
    newBookDialog.showModal();
});
closeButton.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    newBookDialog.close();
});
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const form = new FormData(newBookForm);
    const title = form.get("title");
    const author = form.get("author");
    const pages = form.get("pages");
    let read = form.get("read");
    
    if(title === "" || author === "" || pages === "") {
        alert("Please complete title, author and page-count before submitting!");
    } else {
        let newBook = new Book(title, author, pages, read);
        addBookToLibrary(newBook);
        console.log(myLibrary);
        displayBooks(myLibrary);
        alert("Your book has been succesfully added!");
        inputs.forEach((input) => (input.value = ""));
        newBookDialog.close();
    }
});

// DISPLAY ON LOAD //


// PLACEHOLDER BOOKS
// const LOTR = new Book("The Hobbit","J.R.R Tolkien", 291, true);
// const GOT = new Book("A Game of Thrones", "George R.R. Martin", 597, false);
// addBookToLibrary(LOTR);
// addBookToLibrary(GOT);

displayBooks(myLibrary);

