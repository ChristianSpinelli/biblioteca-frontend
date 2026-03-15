import type { Book } from "../model/book.js";

export class BibliotecaComponent {

    private saveHandler?: (book:Book)=>void;
    private editHandler?: (bookId:number)=>void;
    private deleteHandler?: (bookId:number)=>void;
    private cancelHandler?: ()=>void;

    constructor(){
        this.initForm();
        this.initTableEvents();
        this.initCancel();
    }

    private initForm(){
        const form = document.querySelector(".form-book") as HTMLFormElement;
        form.addEventListener("submit",(event)=>{
            event.preventDefault();

            const { title, author, year, isbn } = form.elements as any;

            const book:Book = {
                title:title.value,
                author:author.value,
                year:Number(year.value),
                isbn:isbn.value
            };

            this.saveHandler?.(book);
        });
    }

    private initCancel(){
        const btnCancel = document.getElementById("btn-cancel");

        btnCancel?.addEventListener("click",()=>{
            this.cancelHandler?.();
        });
    }

    private initTableEvents(){
        const table = document.getElementById("book-table") as HTMLTableElement;
        table.addEventListener("click",(event)=>{
            const target = event.target as HTMLElement;

            if(target.classList.contains("edit")){
                const id = Number(target.dataset['bookId']);
                this.editHandler?.(id);
            }

            if(target.classList.contains("delete")){
                const id = Number(target.dataset['bookId']);
                this.deleteHandler?.(id);
            }

        });

    }

    public bindSave(handler:(book:Book)=>void){
        this.saveHandler = handler;
    }

    public bindEdit(handler:(bookId:number)=>void){
        this.editHandler = handler;
    }

    public bindDelete(handler:(bookId:number)=>void){
        this.deleteHandler = handler;
    }

    public bindCancel(handler:()=>void){
        this.cancelHandler = handler;
    }

    public renderBooks(books:Book[]){
        const table = document.getElementById("book-table") as HTMLTableElement;
        const tbody = table.querySelector("tbody") as HTMLTableSectionElement;

        tbody.innerHTML = "";

        for(const book of books){
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.isbn}</td>
                <td class="buttons">
                    <button class="btn edit" data-book-id="${book.id}">Editar</button>
                    <button class="btn delete" data-book-id="${book.id}">Excluir</button>
                </td>
            `;

            tbody.appendChild(row);
        }

    }

    public fillForm(book:Book){
        const form = document.querySelector(".form-book") as HTMLFormElement;

        const { title, author, year, isbn } = form.elements as any;

        title.value = book.title;
        author.value = book.author;
        year.value = book.year;
        isbn.value = book.isbn;
    }

    public resetForm(){
        const form = document.querySelector(".form-book") as HTMLFormElement;
        form.reset();
    }

}