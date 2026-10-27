/*
 * Importa o Model responsável pelos dados
 * e pelas regras dos alunos.
 */
import AlunoModel from "../model/aluno-model.js";

/*
 * O Controller recebe as requisições encaminhadas
 * pelo Router, consulta o Model e prepara a resposta.
 */
const AlunoController = {
  /*
   * Lista todos os alunos.
   *
   * Endpoint:
   * GET /api/alunos
   */
  listar(req, res) {
    /*
     * Solicita a lista ao Model.
     */
    const alunos = AlunoModel.listar();

    /*
     * Envia uma resposta com status 200.
     */
    return res.status(200).json({
      total: alunos.length,
      dados: alunos,
    });
  },

  /*
   * Cadastra um aluno.
   *
   * Endpoint:
   * POST /api/alunos
   */
  cadastrar(req, res) {
    /*
     * O Express disponibiliza os dados
     * do corpo da requisição em req.body.
     */
    const dados = req.body;

    /*
     * Encaminha os dados ao Model.
     */
    const resultado = AlunoModel.cadastrar(dados);

    /*
     * Verifica se houve algum problema
     * durante a validação.
     */
    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem,
      });
    }

    /*
     * Retorna status 201 quando o aluno
     * é cadastrado com sucesso.
     */
    return res.status(201).json({
      sucesso: true,
      mensagem: "Aluno cadastrado com sucesso.",
      dados: resultado.aluno,
    });
  },
};

/*
 * Exporta o Controller para ser utilizado
 * pelas rotas da aplicação.
 */
export default AlunoController;
