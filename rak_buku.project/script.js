const books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook(title, author, year, isComplete) {
    const newBook = {
        id: new Date().getTime(),
        title,
        author,
        year,
        isComplete
    };
    books.push(newBook);
    saveBooks();
    renderBooks();
}

function removeBook(bookId) {
    const index = books.findIndex(book => book.id == bookId);
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    }
}

function toggleBookStatus(bookId) {
    const book = books.find(book => book.id == bookId);
    if (book) {
        book.isComplete = !book.isComplete;
        saveBooks();
        renderBooks();
    }
}

function renderBooks() {
    const incompleteBookshelf = document.getElementById("incompleteBookList");
    const completeBookshelf = document.getElementById("completeBookList");

    incompleteBookshelf.innerHTML = "";
    completeBookshelf.innerHTML = "";

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-item");
        // Tambahkan atribut data-testid dan data-bookid sesuai ketentuan
        bookElement.setAttribute("data-testid", "bookItem");
        bookElement.setAttribute("data-bookid", book.id);
        
        bookElement.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus('${book.id}')">
                    ${book.isComplete ? "Pindah ke Belum Selesai" : "Pindah ke Selesai"}
                </button>
                <button data-testid="bookItemDeleteButton" onclick="removeBook('${book.id}')">Hapus</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookshelf.appendChild(bookElement);
        } else {
            incompleteBookshelf.appendChild(bookElement);
        }
    });
}

document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    addBook(title, author, year, isComplete);

    event.target.reset();
});

renderBooks();