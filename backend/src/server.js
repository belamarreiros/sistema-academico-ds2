/*
 * Importa o módulo HTTP nativo do Node.js.
 *
 * Não precisamos instalar este módulo,
 * pois ele já acompanha o Node.js.
 */
import http from "node:http";

/*
 * Importa a função responsável por analisar
 * as rotas da aplicação.
 */
import { tratarRotas } from "./routes/aluno-routes.js";

/*
 * Importa a função utilizada para enviar
 * respostas no formato JSON.
 */
import { enviarJson } from "./util/http.js";

/*
 * Define a porta em que o servidor será executado.
 *
 * process.env.PORT permite utilizar uma porta
 * definida pelo ambiente.
 *
 * Caso nenhuma porta seja informada, será utilizada
 * a porta 3000.
 */
const PORTA = Number(process.env.PORT || 3000);

/*
 * Define o endereço em que o servidor aceitará conexões.
 *
 * 0.0.0.0 permite que o servidor seja acessível
 * pelo ambiente de hospedagem.
 */
const HOST = "0.0.0.0";

/*
 * Cria o servidor HTTP.
 *
 * A função será executada sempre que o servidor
 * receber uma nova requisição.
 */
const servidor = http.createServer(async (req, res) => {
  try {
    /*
     * Encaminha a requisição para o conjunto de rotas.
     *
     * A função retornará true se uma rota
     * correspondente for encontrada.
     */
    const rotaEncontrada = await tratarRotas(req, res);

    /*
     * Se nenhuma rota for encontrada,
     * responde com o status HTTP 404.
     */
    if (!rotaEncontrada) {
      enviarJson(res, 404, {
        sucesso: false,
        mensagem: "Rota não encontrada.",
      });
    }
  } catch (erro) {
    /*
     * Registra o erro no terminal do servidor.
     */
    console.error("Erro interno do servidor:", erro);

    /*
     * Envia uma resposta de erro caso a resposta
     * ainda não tenha sido finalizada.
     */
    if (!res.headersSent) {
      enviarJson(res, 500, {
        sucesso: false,
        mensagem: "Erro interno do servidor.",
      });
    } else {
      res.end();
    }
  }
});

/*
 * Inicia o servidor e aguarda novas requisições
 * na porta definida anteriormente.
 */
servidor.listen(PORTA, HOST, () => {
  /*
   * Informa no terminal que o servidor está funcionando.
   */
  console.log(`Servidor disponível em http://localhost:${PORTA}`);
});
