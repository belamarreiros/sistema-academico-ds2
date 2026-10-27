/*
 * VIEW DE ALUNOS
 *
 * A View é responsável pela interação com o usuário.
 *
 * Nesta primeira versão, ela utiliza:
 * - prompt() para receber informações;
 * - confirm() para fazer uma pergunta;
 * - console.log() para apresentar mensagens;
 * - console.table() para apresentar objetos e arrays;
 * - console.error() para apresentar erros.
 *
 * A View não deve:
 * - validar e-mail;
 * - verificar RA duplicado;
 * - cadastrar o aluno;
 * - armazenar os dados;
 * - aplicar regras de negócio.
 *
 * Essas responsabilidades pertencem ao Model.
 */
const AlunoView = {
  /*
   * Solicita as informações necessárias para o cadastro.
   *
   * Cada chamada de prompt() apresenta uma caixa de entrada
   * e devolve o valor digitado pelo usuário.
   *
   * Os valores são reunidos em um único objeto.
   */
  lerDados() {
    return {
      ra: prompt("Digite o RA do aluno:"),
      nome: prompt("Digite o nome do aluno:"),
      email: prompt("Digite o e-mail do aluno:"),
      curso: prompt("Digite o curso:"),
      turma: prompt("Digite a turma:"),
    };
  },

  /*
   * Apresenta o aluno que foi cadastrado com sucesso.
   *
   * O parâmetro aluno recebe o objeto criado pelo Model
   * e encaminhado pelo Controller.
   */
  exibirAluno(aluno) {
    /*
     * Apresenta uma mensagem simples no console.
     */
    console.log("Aluno cadastrado com sucesso.");

    /*
     * console.table() apresenta os dados do objeto
     * em formato de tabela, facilitando a leitura.
     */
    console.table(aluno);
  },

  /*
   * Apresenta uma mensagem de erro.
   *
   * A View apenas apresenta a mensagem recebida.
   * Ela não identifica o problema.
   *
   * O parâmetro mensagem será enviado pelo Controller,
   * depois que o Model identificar o problema.
   */
  exibirErro(mensagem) {
    /*
     * console.error() apresenta a mensagem como erro.
     *
     * Dependendo do navegador, a mensagem poderá aparecer
     * em vermelho ou com um ícone de alerta.
     */
    console.error("Erro:", mensagem);
  },

  /*
   * Pergunta ao usuário se deseja realizar outro cadastro.
   *
   * confirm() apresenta uma janela com duas opções:
   * - OK, que devolve true;
   * - Cancelar, que devolve false.
   *
   * Esse valor será utilizado pelo Controller para decidir
   * se o processo de cadastro deverá continuar.
   */
  perguntarNovoCadastro() {
    return confirm("Deseja cadastrar outro aluno?");
  },

  /*
   * Apresenta a lista completa de alunos.
   *
   * O parâmetro alunos deverá receber um array.
   */
  exibirLista(alunos) {
    /*
     * A propriedade length informa a quantidade
     * de elementos existentes no array.
     */
    console.log("Quantidade de alunos cadastrados:", alunos.length);

    /*
     * Verifica se o array está vazio.
     *
     * Se length for igual a zero, nenhum aluno
     * foi cadastrado.
     */
    if (alunos.length === 0) {
      console.log("Nenhum aluno foi cadastrado.");

      /*
       * O return encerra a execução deste método.
       *
       * Dessa maneira, console.table() não será
       * executado quando não existirem alunos.
       */
      return;
    }

    /*
     * Se o array possuir alunos, apresenta todos
     * os registros em formato de tabela.
     */
    console.table(alunos);
  },

  /*
   * Apresenta os alunos convertidos para formato JSON.
   *
   * O parâmetro textoJSON recebe uma string criada
   * anteriormente por JSON.stringify().
   */
  exibirJSON(textoJSON) {
    console.log("Alunos em formato JSON:");

    /*
     * Neste momento, o conteúdo apresentado é texto.
     * Ele não é mais um array que possa ser manipulado
     * diretamente pelo JavaScript.
     */
    console.log(textoJSON);
  },

  /*
   * Apresenta os dados reconstruídos com JSON.parse().
   *
   * Depois da conversão, os dados deixam de ser apenas
   * um texto JSON e voltam a ser valores JavaScript.
   *
   * Neste projeto, o resultado será novamente
   * um array de objetos.
   */
  exibirDadosReconstruidos(dados) {
    console.log("Dados reconstruídos com JSON.parse():");

    /*
     * Como dados voltou a ser um array de objetos,
     * podemos apresentá-lo com console.table().
     */
    console.table(dados);
  },
};
