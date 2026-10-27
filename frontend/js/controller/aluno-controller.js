/*
 * CONTROLLER DE ALUNOS
 *
 * O Controller coordena o funcionamento da aplicação.
 *
 * Ele é responsável por:
 * - solicitar dados à View;
 * - enviar os dados ao Model;
 * - receber o resultado do Model;
 * - decidir qual método da View será executado;
 * - controlar a repetição dos cadastros;
 * - coordenar a conversão dos dados para JSON.
 *
 * O Controller não deve:
 * - validar campos;
 * - verificar RA duplicado;
 * - realizar cálculos;
 * - armazenar os alunos;
 * - apresentar diretamente mensagens no console.
 */
const AlunoController = {
  /*
   * Método que inicia o funcionamento da aplicação.
   *
   * Quando esse método for chamado, o processo de cadastro
   * começará e continuará enquanto o usuário desejar.
   */
  iniciar() {
    /*
     * Variável que controla a repetição dos cadastros.
     *
     * Ela começa com true para que o laço while
     * seja executado pelo menos uma vez.
     */
    let continuar = true;

    /*
     * O laço será repetido enquanto continuar for true.
     *
     * A cada repetição, o usuário poderá cadastrar
     * um novo aluno.
     */
    while (continuar) {
      /*
       * Solicita que a View leia os dados do usuário.
       *
       * lerDados() devolve um objeto com:
       * - ra;
       * - nome;
       * - email;
       * - curso;
       * - turma.
       *
       * O Controller não utiliza prompt() diretamente.
       */
      const dados = AlunoView.lerDados();

      /*
       * Envia os dados para o Model.
       *
       * O Model será responsável por:
       * - normalizar os campos;
       * - validar os campos;
       * - validar o e-mail;
       * - verificar se o RA já existe;
       * - criar e armazenar o aluno.
       *
       * cadastrar() devolve um objeto informando
       * se a operação foi bem-sucedida.
       */
      const resultado = AlunoModel.cadastrar(dados);

      /*
       * Verifica a propriedade sucesso do resultado.
       *
       * Se resultado.sucesso for true, significa
       * que o aluno foi cadastrado corretamente.
       */
      if (resultado.sucesso) {
        /*
         * Solicita que a View apresente o aluno.
         *
         * O Controller não utiliza console.log()
         * ou console.table() diretamente.
         */
        AlunoView.exibirAluno(resultado.aluno);
      } else {
        /*
         * Se resultado.sucesso for false,
         * solicita que a View apresente o erro
         * identificado pelo Model.
         */
        AlunoView.exibirErro(resultado.mensagem);
      }

      /*
       * Pergunta se o usuário deseja cadastrar outro aluno.
       *
       * perguntarNovoCadastro() devolve true ou false.
       */
      continuar = AlunoView.perguntarNovoCadastro();
    }

    /*
     * Quando o usuário encerrar os cadastros,
     * apresenta a lista completa de alunos.
     */
    const alunos = AlunoModel.listar();

    /*
     * Envia a lista para a View apresentar.
     *
     * A View mostrará a quantidade de alunos e,
     * caso existam registros, exibirá uma tabela.
     */
    AlunoView.exibirLista(alunos);

    /*
     * Converte o array de alunos em um texto JSON.
     *
     * Primeiro parâmetro:
     * alunos — valor que será convertido.
     *
     * Segundo parâmetro:
     * null — não será aplicado um filtro na conversão.
     *
     * Terceiro parâmetro:
     * 2 — quantidade de espaços utilizada na indentação.
     *
     * A indentação deixa o JSON mais fácil de ler.
     */
    const textoJSON = JSON.stringify(alunos, null, 2);

    /*
     * Solicita que a View apresente o texto JSON.
     *
     * Neste momento, textoJSON é uma string.
     * Ele não é mais um array que possa ser manipulado
     * diretamente como uma lista de alunos.
     */
    AlunoView.exibirJSON(textoJSON);

    /*
     * Converte o texto JSON novamente em um valor JavaScript.
     *
     * Como o JSON foi criado a partir de um array,
     * JSON.parse() produzirá um novo array de objetos.
     */
    const dadosRecuperados = JSON.parse(textoJSON);

    /*
     * Solicita que a View apresente os dados reconstruídos.
     *
     * Isso demonstra que o JSON pode ser utilizado
     * para transportar informações e depois reconstruí-las.
     */
    AlunoView.exibirDadosReconstruidos(dadosRecuperados);
  },
};

/*
 * Inicia a aplicação.
 *
 * Sem esta chamada, o objeto AlunoController existiria,
 * mas o processo de cadastro não seria executado.
 */
AlunoController.iniciar();
