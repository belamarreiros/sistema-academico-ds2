/*
 * Importa o framework Express.
 */
import express from "express";

/*
 * Importa o middleware responsável pela
 * configuração dos cabeçalhos CORS.
 */
import cors from "cors";

/*
 * Importa as rotas relacionadas aos alunos.
 */
import alunoRoutes from "./routes/aluno-routes.js";

/*
 * Cria a aplicação Express.
 *
 * O objeto app será o principal objeto de configuração
 * da nossa API.
 */
const app = express();

/*
 * Configura o CORS da aplicação.
 *
 * Nesta fase, permitiremos requisições
 * originadas de qualquer endereço.
 *
 * Posteriormente, poderemos restringir
 * o acesso ao frontend publicado.
 */
app.use(
  cors({
    /*
     * O asterisco permite qualquer origem.
     */
    origin: "*",

    /*
     * Métodos HTTP autorizados.
     */
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    /*
     * Cabeçalhos que poderão ser enviados
     * pelo frontend.
     *
     * Authorization será utilizado futuramente
     * no envio de tokens JWT.
     */
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/*
 * Middleware responsável por interpretar
 * o corpo das requisições no formato JSON.
 *
 * Quando recebermos:
 *
 * {
 *     "nome": "Ana"
 * }
 *
 * O Express transformará o JSON em um objeto
 * e disponibilizará em req.body.
 */
app.use(express.json());

/*
 * Rota responsável por verificar se a API
 * está funcionando.
 */
app.get("/api/health", (req, res) => {
  /*
   * res.status(200) define o status HTTP.
   *
   * json() converte o objeto para JSON
   * e finaliza a resposta.
   */
  return res.status(200).json({
    status: "ok",
    mensagem: "Servidor Express funcionando.",
  });
});

/*
 * Registra as rotas dos alunos.
 *
 * Todas as rotas definidas em alunoRoutes
 * receberão o prefixo /api/alunos.
 */
app.use("/api/alunos", alunoRoutes);

/*
 * Middleware executado quando nenhuma rota
 * anterior corresponde à requisição.
 */
app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada.",
  });
});

/*
 * Middleware global para tratamento de erros.
 *
 * Um middleware de erro possui quatro parâmetros:
 * err, req, res e next.
 */
app.use((err, req, res, next) => {
  /*
   * Trata erros de JSON inválido.
   *
   * O Express gera o tipo entity.parse.failed
   * quando não consegue interpretar um JSON.
   */
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      sucesso: false,
      mensagem: "O corpo da requisição contém um JSON inválido.",
    });
  }

  /*
   * Registra os detalhes do erro no terminal.
   */
  console.error("Erro interno do servidor:", err);

  /*
   * Envia uma resposta de erro ao cliente.
   */
  return res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno do servidor.",
  });
});

/*
 * Exporta a aplicação para que ela possa
 * ser utilizada pelo arquivo server.js.
 */
export default app;
