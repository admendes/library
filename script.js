let myLibrary = [];

class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

function addBookToLibrary(form) {
    let title = form.ftitle.value;
    let author = form.fauthor.value;
    let read = form.fread.value;
    console.log(title)
    if (title != "" && author != "" && !containsBook(title)) {
        let book = new Book(title, author, read);
        myLibrary.push(book);
        save();
    }
}

function changeBookStatus(title, status) {
    getBook(title).read = status;
    console.log("aaaaaa");
}

function containsBook(title) {
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title.toLowerCase() == title.toLowerCase())
            return true;
    }
    return false;
}

function getBook(title) {
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title.toLowerCase() == title.toLowerCase())
            return myLibrary[i];
    }
    return null;
}

function deleteBook(title) {

}
//removebook

function showBooks() {
    console.log(myLibrary);

    const content = document.getElementById("content");

    let cell = document.createElement("div");
    cell.textContent = "Title";
    content.appendChild(cell).className = "grid-item grid-item-top";
    cell = document.createElement("div");
    cell.textContent = "Author";
    content.appendChild(cell).className = "grid-item grid-item-top";
    cell = document.createElement("div");
    cell.textContent = "Status";
    content.appendChild(cell).className = "grid-item grid-item-top";
    cell = document.createElement("div");
    content.appendChild(cell).className = "grid-item grid-item-top";

    for (let c = 0; c < myLibrary.length; c++) {
        let cell = document.createElement("div");
        cell.textContent = myLibrary[c].title;
        content.appendChild(cell).className = "grid-item grid-item-text";
        cell = document.createElement("div");
        cell.textContent = myLibrary[c].author;
        content.appendChild(cell).className = "grid-item grid-item-text";

        cell = document.createElement("button");
        let readVal = myLibrary[c].read;
        if (readVal == "yes") {
            cell.textContent = "Read";
            //cell.onclick = changeBookStatus(myLibrary[c].title, "no");
            cell.addEventListener('click', function(){
                myLibrary[c].read = "no";
                cell.textContent = "Not Read";
                save();
                refreshPage();
            }, false);
        }
        else {
            cell.textContent = "Not Read";
            //cell.onclick = changeBookStatus(myLibrary[c].title, "yes");
            cell.addEventListener('click', function(){
                myLibrary[c].read = "yes";
                cell.textContent = "Read";
                save();
                refreshPage();
            }, false);

        }
        content.appendChild(cell).className = "grid-item read-button";
        let deleteCell = document.createElement("button");
        deleteCell.textContent = "Delete";


        deleteCell.addEventListener('click', function(){
            const book = getBook(myLibrary[c].title)
            const index = myLibrary.indexOf(book);
            if (index > -1) {
                myLibrary.splice(index, 1);
            }
            save();
            refreshPage();
        }, false);

        content.appendChild(deleteCell).className = "grid-item delete-button";
    };

}

function save() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function load() {
    if (JSON.parse(localStorage.getItem("library")) != null){
        myLibrary = JSON.parse(localStorage.getItem("library"));
    }
    else {
        myLibrary = [];
    }
}

function deleteLibrary() {
    localStorage.clear();
    refreshPage();
}

function refreshPage() {
    window.location.reload();
}

load();
showBooks();
console.log(getBook("My adventures test book"));
/*
// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("library", myLibrary);
    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem("library");
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
*/