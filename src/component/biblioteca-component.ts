import type { Book } from "../model/book.js";
import type { Response } from "../model/response.js";
import type { BookService } from "../services/book-service.js";

export class BibliotecaComponent{

    private bookService:BookService;

    constructor(bookService:BookService){
        this.bookService = bookService;
    }

    public async loadBooks(lastBookId:number, pageLength:number): Promise<Array<Book>>{
        return await this.bookService.listBooks(lastBookId, pageLength);
    }

    public fillBooksOnTable(books:Array<Book>){
        const table: HTMLTableElement = document.getElementById("book-table") as HTMLTableElement;
        const tbody = table.getElementsByTagName("tbody").item(0) as HTMLTableSectionElement;
        tbody.innerHTML = "";
        
        for(const book of books){
            const row: HTMLTableRowElement = document.createElement("tr");
            
            const cellTitle: HTMLTableCellElement = document.createElement("td");
            cellTitle.textContent = book.title;
            row.appendChild(cellTitle);

            const cellAuthor: HTMLTableCellElement = document.createElement("td");
            cellAuthor.textContent = book.author;
            row.appendChild(cellAuthor);
            
            const cellYear: HTMLTableCellElement = document.createElement("td");
            cellYear.textContent = book.year.toString();
            row.appendChild(cellYear);

            const cellIsbn: HTMLTableCellElement = document.createElement("td");
            cellIsbn.textContent = book.isbn.toString();
            row.appendChild(cellIsbn);

            const cellButtons: HTMLTableCellElement = document.createElement("td");
            cellButtons.className = "buttons";
            
            const buttonEdit: HTMLButtonElement = document.createElement("button")
            buttonEdit.className = "btn edit";
            buttonEdit.textContent = "Editar";
            buttonEdit.dataset['bookId'] = book!.id?.toString();
            cellButtons.appendChild(buttonEdit);

            const buttonDelete: HTMLButtonElement = document.createElement("button")
            buttonDelete.className = "btn delete";
            buttonDelete.textContent = "Excluir";
            buttonDelete.dataset['bookId'] = book!.id?.toString();
            cellButtons.appendChild(buttonDelete);

            row.appendChild(cellButtons);
            
            tbody.appendChild(row);
        }
    }

    public async saveBook(): Promise<void>{
        const inputTitle = document.getElementById("input-title") as HTMLInputElement;
        const inputAuthor = document.getElementById("input-author") as HTMLInputElement;
        const inputYear = document.getElementById("input-year") as HTMLInputElement;
        const inputIsbn = document.getElementById("input-isbn") as HTMLInputElement;

        if(!inputTitle.value || !inputAuthor.value || !inputYear.value || !inputIsbn.value){
            alert("Preencha todos os campos para cadastrar.");
            throw new Error("Campos obrigatórios não preenchidos");
        }

        const book:Book = {
            author:inputAuthor.value,
            title:inputTitle.value,
            year:Number(inputYear.value),
            isbn:inputIsbn.value 
        }

        await this.bookService.createBook(book);
    }

    public async deleteBook(bookId:number): Promise<Response>{
        return await this.bookService.deleteBook(bookId);
    }
    
}