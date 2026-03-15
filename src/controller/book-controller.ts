import { BibliotecaComponent } from "../component/biblioteca-component.js";
import type { Book } from "../model/book.js";
import type { Response } from "../model/response.js";
import { BookService } from "../services/book-service.js";

export class BookController {

    private bibliotecaComponent: BibliotecaComponent;
    private service: BookService;

    private books: Book[] = [];
    private editingBook: Book | undefined;

    constructor(bibliotecaComponent:BibliotecaComponent, service:BookService){
        this.bibliotecaComponent = bibliotecaComponent;
        this.service = service;
    }

    public init(){
        this.bibliotecaComponent.bindSave(this.handleSave);
        this.bibliotecaComponent.bindCancel(this.handleCancel);
        this.bibliotecaComponent.bindEdit(this.handleEdit);
        this.bibliotecaComponent.bindDelete(this.handleDelete);

        this.loadBooks();
    }

    private loadBooks = async () => {
        try{
            this.books = await this.service.listBooks(0, 1000000);
            this.bibliotecaComponent.renderBooks(this.books);
        }catch(error){
            console.error(error);
        }
    }

    private handleSave = async (book:Book) => {

        try{

            if(!book.title || !book.author || !book.year || !book.isbn){
                alert("Preencha todos os campos.");
                return;
            }

            if(this.editingBook){
                const updatedBook = {...this.editingBook, ...book};
                await this.service.updateBook(updatedBook);
                this.editingBook = undefined;

            }else{
                await this.service.createBook(book);
            }

            this.bibliotecaComponent.resetForm();
            await this.loadBooks();

        }catch(error){
            console.error(error);
        }

    }

    private handleEdit = (bookId:number) => {

        const book = this.books.find(b => b.id === bookId);

        if(!book) return;

        this.editingBook = book;

        this.bibliotecaComponent.fillForm(book);
    }

    private handleDelete = async (bookId:number) => {

        try{

            const response:Response = await this.service.deleteBook(bookId);

            alert(response.message);

            await this.loadBooks();

        }catch(error){
            console.error(error);
        }

    }

    private handleCancel = () => {
        this.editingBook = undefined;
        this.bibliotecaComponent.resetForm();
    }

}