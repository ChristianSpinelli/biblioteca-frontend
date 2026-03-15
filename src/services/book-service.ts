import type { Book } from "../model/book.js";
import type { Response } from "../model/response.js";
import { BASE_URL } from "../utils/environment.js";

export class BookService {

    public async listBooks(lastBookId:number, pageLength:number):Promise<Book[]>{
        const response = await fetch(`${BASE_URL}/biblioteca/books/${lastBookId}/${pageLength}`);

        if(!response.ok){
            throw new Error("Erro ao buscar livros.");
        }

        return await response.json();
    }

    public async createBook(book:Book):Promise<Book>{
        const response = await fetch(`${BASE_URL}/biblioteca/books/book`,{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify(book)
        });

        if(!response.ok){
            throw new Error("Erro ao criar livro.");
        }

        return await response.json();
    }

    public async deleteBook(bookId:number):Promise<Response>{
        const response = await fetch(`${BASE_URL}/biblioteca/books/book/${bookId}`,{
            method:"DELETE"
        });

        if(!response.ok){
            throw new Error("Erro ao excluir livro.");
        }

        return await response.json();
    }

    public async updateBook(book:Book){
        const response = await fetch(`${BASE_URL}/biblioteca/books/book/${book.id}`,{
            method:"PUT",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify(book)
        });

        if(!response.ok){
            throw new Error("Erro ao atualizar livro.");
        }

        return await response.json();
    }

}