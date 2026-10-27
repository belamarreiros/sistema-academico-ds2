/*
 * Importa a aplicação Express.
 */
import app from "./app.js";

/*
 * Define a porta do servidor.
 *
 * Caso nenhuma porta seja informada pelo ambiente,
 * será utilizada a porta 3000.
 */
const PORTA = Number(process.env.PORT || 3000);

/*
 * Inicia o servidor.
 */
app.listen(PORTA, () => {
  console.log(`Servidor disponível em http://localhost:${PORTA}`);
});
