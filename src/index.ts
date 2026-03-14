import { BibliotecaComponent } from "./component/biblioteca-component.js";
import type { Book } from "./model/book.js";
import type { Response } from "./model/response.js";
import { BookService } from "./services/book-service.js";

class App{
    
    private bibliotecaComponent: BibliotecaComponent;

    constructor(bibliotecaComponent: BibliotecaComponent){
        this.bibliotecaComponent = bibliotecaComponent;
        const form = document.querySelector(".form-book") as HTMLFormElement;
        this.initBookForm(form);
        this.initButtonCancel(form);
    }

    private initButtonCancel(form: HTMLFormElement){
        const btnCancel = document.getElementById("btn-cancel");
        btnCancel?.addEventListener("click", () => {
            form.reset();
        });
    }

    private initBookForm(form:HTMLFormElement){ 
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.onClickSaveBook(form);
        });
    }

    private initButtonsDelete(){
        const buttonElements = document.getElementsByClassName("btn delete") as HTMLCollectionOf<HTMLButtonElement>;
        const deleteButtons = Array.from(buttonElements);
        deleteButtons.forEach((deleteButtton:HTMLButtonElement) => {
            deleteButtton.addEventListener("click", (event)=>{
                const button = event.currentTarget as HTMLButtonElement;
                const bookId = Number(button.dataset['bookId']);
                this.onClickDeleteBook(bookId);
            });
        });
    }

    private onClickDeleteBook(bookId:number){
        this.bibliotecaComponent.deleteBook(bookId).then((response:Response)=>{
            alert(response.message);
            this.loadBooks();
        }).catch((error)=>{
            console.error(error);
        });
    }

    private onClickSaveBook(form:HTMLFormElement){
        this.bibliotecaComponent.saveBook().then(()=>{
            form.reset();
            this.loadBooks();
        }).catch((error)=>{
            console.error(error);
        });
    }

    public loadBooks(){
        this.bibliotecaComponent.loadBooks(0, 10).then((books:Array<Book>) =>{
            this.bibliotecaComponent.fillBooksOnTable(books);
            this.initButtonsDelete();
        });
    }
}

const bookService:BookService = new BookService();
const bibliotecaComponent:BibliotecaComponent = new BibliotecaComponent(bookService);
const app = new App(bibliotecaComponent);
app.loadBooks();







