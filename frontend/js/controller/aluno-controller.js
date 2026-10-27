/*
 * CONTROLLER DE ALUNOS — VERSÃO 0.3
 *
 * O Controller agora utiliza o Service.
 *
 * Ele não acessa diretamente:
 * - localStorage;
 * - arrays;
 * - JSON.
 */
const AlunoController = {
  /*
   * Inicializa a aplicação.
   */
  iniciar() {
    /*
     * Inicializa as referências da View.
     */
    AlunoView.inicializar();

    /*
     * Configura o cadastro.
     */
    AlunoView.configurarFormulario(function (dados) {
      AlunoController.cadastrar(dados);
    });

    /*
     * Configura o botão Limpar dados.
     */
    AlunoView.configurarBotaoLimpar(function () {
      AlunoController.limparDados();
    });

    /*
     * Carrega e apresenta os dados já armazenados.
     *
     * Isso faz os alunos voltarem para a tabela
     * depois que a página for atualizada.
     */
    AlunoController.atualizarVisualizacao();
  },

  /*
   * Coordena o cadastro.
   */
  cadastrar(dados) {
    const resultado = AlunoService.cadastrar(dados);

    if (!resultado.sucesso) {
      AlunoView.exibirErro(resultado.mensagem);
      return;
    }

    AlunoView.exibirSucesso(
      `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`,
    );

    AlunoView.limparFormulario();

    AlunoController.atualizarVisualizacao();
  },

  /*
   * Coordena a remoção de todos os dados.
   */
  limparDados() {
    const alunos = AlunoService.listar();

    /*
     * Evita solicitar confirmação quando
     * a lista já estiver vazia.
     */
    if (alunos.length === 0) {
      AlunoView.exibirErro("Não existem alunos para remover.");

      return;
    }

    /*
     * Solicita confirmação à View.
     */
    const confirmou = AlunoView.confirmarLimpeza();

    if (!confirmou) {
      return;
    }

    /*
     * Solicita que o Service remova os dados.
     */
    AlunoService.limpar();

    AlunoView.exibirSucesso("Todos os alunos foram removidos.");

    AlunoController.atualizarVisualizacao();
  },

  /*
   * Recupera os dados e atualiza a interface.
   */
  atualizarVisualizacao() {
    const alunos = AlunoService.listar();

    AlunoView.exibirLista(alunos);

    const textoJson = JSON.stringify(alunos, null, 2);

    AlunoView.exibirJSON(textoJson);
  },
};

/*
 * Inicia a aplicação.
 */
AlunoController.iniciar();
