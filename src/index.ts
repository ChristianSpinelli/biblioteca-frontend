import { BibliotecaComponent } from "./component/biblioteca-component.js";
import type { Book } from "./model/book.js";
import type { Response } from "./model/response.js";
import { BookService } from "./services/book-service.js";

class App {

    private bibliotecaComponent: BibliotecaComponent;
    private books: Array<Book> = [];
    private isEditing: boolean = false;
    private editingBook: Book | undefined;

    constructor(bibliotecaComponent: BibliotecaComponent){
        this.bibliotecaComponent = bibliotecaComponent;

        const form = document.querySelector(".form-book") as HTMLFormElement;

        this.initBookForm(form);
        this.initButtonCancel(form);
    }

    private initButtonCancel(form: HTMLFormElement){
        const btnCancel = document.getElementById("btn-cancel");

        btnCancel?.addEventListener("click", () => {
            this.isEditing = false;
            this.editingBook = undefined;
            form.reset();
        });
    }

    private initBookForm(form:HTMLFormElement){ 
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.onClickSaveBook(form);
        });
    }

    private initButtonsEdit(){
        const form = document.querySelector(".form-book") as HTMLFormElement;

        const buttonElements = document.getElementsByClassName("btn edit") as HTMLCollectionOf<HTMLButtonElement>;
        const editButtons = Array.from(buttonElements);

        editButtons.forEach((editButton:HTMLButtonElement) => {
            editButton.addEventListener("click", (event)=>{
                const button = event.currentTarget as HTMLButtonElement;
                const bookId = Number(button.dataset['bookId']);
                this.onClickEditBook(bookId, form);
            });
        });
    }

    private initButtonsDelete(){
        const buttonElements = document.getElementsByClassName("btn delete") as HTMLCollectionOf<HTMLButtonElement>;
        const deleteButtons = Array.from(buttonElements);

        deleteButtons.forEach((deleteButton:HTMLButtonElement) => {
            deleteButton.addEventListener("click", (event)=>{
                const button = event.currentTarget as HTMLButtonElement;
                const bookId = Number(button.dataset['bookId']);
                this.onClickDeleteBook(bookId);
            });
        });
    }

    private onClickEditBook(bookId:number, form:HTMLFormElement){
        const book = this.books.find((value:Book) => value.id === bookId);

        if(book !== undefined){
            this.isEditing = true;
            this.editingBook = book;

            const { title, author, year, isbn } = form.elements as any;

            title.value = book.title;
            author.value = book.author;
            year.value = book.year;
            isbn.value = book.isbn;
        }
    }

    private onClickDeleteBook(bookId:number){
        this.bibliotecaComponent.deleteBook(bookId)
        .then((response:Response)=>{
            alert(response.message);
            this.loadBooks();
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    private onClickSaveBook(form:HTMLFormElement){
        const { title, author, year, isbn } = form.elements as any;
        if(!this.isEditing){
            this.bibliotecaComponent.saveBook({ title: title.value, author: author.value, year: year.value, isbn: isbn.value })
            .then(()=>{
                form.reset();
                this.loadBooks();
            })
            .catch((error)=>{
                console.error(error);
            });

        }else if(this.editingBook){
            this.editingBook = { ...this.editingBook, title: title.value, author: author.value, year: year.value, isbn: isbn.value }
            this.bibliotecaComponent.editBook(this.editingBook)
            .then(()=>{
                form.reset();
                this.loadBooks();
                this.isEditing = false;
                this.editingBook = undefined;
            })
            .catch((error)=>{
                console.error(error);
            });
        }
    }

    public loadBooks(){
        this.bibliotecaComponent.loadBooks(0, 1000000)
        .then((books:Array<Book>) =>{

            this.books = books;

            this.bibliotecaComponent.fillBooksOnTable(books);

            this.initButtonsDelete();
            this.initButtonsEdit();
        });
    }
}

const bookService:BookService = new BookService();
const bibliotecaComponent:BibliotecaComponent = new BibliotecaComponent(bookService);

const app = new App(bibliotecaComponent);

app.loadBooks();