import express from 'express';
import path from 'path'; // Importe o path para lidar com caminhos

const app = express();
app.use(express.json());

// 1. Diga ao Express onde estão seus arquivos (HTML, CSS, JS do front)
// Se o index.html estiver numa pasta chamada 'public':
app.use(express.static(path.join(import.meta.dirname, '../src')));

interface RequestBody {
  name: string;
}

// 2. Rota GET para servir o HTML quando você acessar no navegador
app.get('/', (_, res) => {
  // Ajuste o caminho abaixo para onde seu arquivo index.html realmente está
  res.sendFile(path.join(import.meta.dirname, '../src/index.html')); 
});

// Sua rota POST atual (continua funcionando para formulários/insomnia)
app.post('/', (request, response) => {
  const user = request.body as RequestBody;
  return response.send({
    message: `Hello ${user.name}`,
  });
});

app.listen(3000, () => console.log('🚀 Server rodando em http://localhost:3000'));