import { BibliotecaComponent } from "./component/biblioteca-component.js";
import { BookController } from "./controller/book-controller.js";
import { BookService } from "./services/book-service.js";

const bookService = new BookService();
const bibliotecaComponent = new BibliotecaComponent();

const controller = new BookController(bibliotecaComponent, bookService);

controller.init();