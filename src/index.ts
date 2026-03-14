import { BibliotecaComponent } from "./component/biblioteca-component.js";
import type { Book } from "./model/book.js";
import { BookService } from "./services/book-service.js";

const bookService: BookService = new BookService();
const bibliotecaComponent: BibliotecaComponent = new BibliotecaComponent(bookService);

const books:Array<Book> = await bibliotecaComponent.loadBooks(0, 10);
bibliotecaComponent.fillBooksOnTable(books);

