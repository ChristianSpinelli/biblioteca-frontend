import type { Book } from "../model/book.js";
import { BASE_URL } from "../utils/environment.js";

export class BookService {

    public async listBooks(lastBookId:number, pageLength: number): Promise<Array<Book>>{
        const response = await fetch(`${BASE_URL}/biblioteca/books/${lastBookId}/${pageLength}`);

        if(!response.ok){
            console.log("Erro ao buscar livros.")
        }

        return await response.json();
    }

}