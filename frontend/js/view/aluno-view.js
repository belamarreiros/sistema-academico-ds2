/*
 * VIEW DE ALUNOS — VERSÃO COM DOM
 *
 * Esta View é responsável por:
 * - localizar elementos HTML;
 * - ler os campos do formulário;
 * - observar o evento submit;
 * - apresentar mensagens;
 * - montar a tabela;
 * - apresentar o JSON.
 */
const AlunoView = {
  /*
   * Objeto que armazenará referências aos elementos HTML.
   *
   * Isso evita repetir document.getElementById()
   * várias vezes durante a execução.
   */
  elementos: {},

  /*
   * Localiza e armazena os elementos da página.
   *
   * Este método deve ser executado antes dos demais.
   */
  inicializar() {
    AlunoView.elementos.formulario = document.getElementById("form-aluno");

    AlunoView.elementos.ra = document.getElementById("ra");

    AlunoView.elementos.nome = document.getElementById("nome");

    AlunoView.elementos.email = document.getElementById("email");

    AlunoView.elementos.curso = document.getElementById("curso");

    AlunoView.elementos.turma = document.getElementById("turma");

    AlunoView.elementos.mensagem = document.getElementById("mensagem");

    AlunoView.elementos.tabela = document.getElementById("corpo-tabela-alunos");

    AlunoView.elementos.totalAlunos = document.getElementById("total-alunos");

    AlunoView.elementos.saidaJson = document.getElementById("saida-json");
  },

  /*
   * Registra uma função que será executada quando
   * o formulário for enviado.
   *
   * O parâmetro aoEnviar é uma função recebida
   * do Controller.
   */
  configurarFormulario(aoEnviar) {
    AlunoView.elementos.formulario.addEventListener(
      "submit",
      function (evento) {
        /*
         * Impede o comportamento padrão do formulário,
         * que seria recarregar a página.
         */
        evento.preventDefault();

        /*
         * Lê os valores atuais do formulário.
         */
        const dados = AlunoView.lerDados();

        /*
         * Envia os dados para a função fornecida
         * pelo Controller.
         */
        aoEnviar(dados);
      },
    );
  },

  /*
   * Lê a propriedade value de cada campo.
   *
   * A View apenas coleta os valores.
   * A normalização e a validação pertencem ao Model.
   */
  lerDados() {
    return {
      ra: AlunoView.elementos.ra.value,
      nome: AlunoView.elementos.nome.value,
      email: AlunoView.elementos.email.value,
      curso: AlunoView.elementos.curso.value,
      turma: AlunoView.elementos.turma.value,
    };
  },

  /*
   * Apresenta uma mensagem de sucesso.
   */
  exibirSucesso(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;

    /*
     * Define as classes utilizadas no CSS.
     */
    AlunoView.elementos.mensagem.className = "mensagem sucesso";
  },

  /*
   * Apresenta uma mensagem de erro.
   */
  exibirErro(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;

    AlunoView.elementos.mensagem.className = "mensagem erro";
  },

  /*
   * Limpa os campos depois de um cadastro bem-sucedido.
   */
  limparFormulario() {
    AlunoView.elementos.formulario.reset();

    /*
     * Devolve o foco ao campo RA para facilitar
     * o próximo cadastro.
     */
    AlunoView.elementos.ra.focus();
  },

  /*
   * Devolve a referência ao corpo da tabela.
   */
  obterCorpoTabela() {
    return AlunoView.elementos.tabela;
  },

  /*
   * Atualiza o contador de alunos.
   */
  atualizarTotal(quantidade) {
    AlunoView.elementos.totalAlunos.textContent = `Total: ${quantidade}`;
  },

  /*
   * Apresenta a lista de alunos na tabela.
   */
  exibirLista(alunos) {
    const corpo = AlunoView.elementos.tabela;

    /*
     * Remove as linhas anteriores.
     */
    corpo.innerHTML = "";

    /*
     * Cria uma linha para cada aluno cadastrado.
     */
    alunos.forEach((aluno) => {
      const linha = document.createElement("tr");

      /*
       * Cria as células com os dados do aluno.
       */
      const valores = [
        aluno.id,
        aluno.ra,
        aluno.nome,
        aluno.email,
        aluno.curso,
        aluno.turma,
        aluno.ativo ? "Ativo" : "Inativo",
      ];

      valores.forEach((valor) => {
        const celula = document.createElement("td");

        celula.textContent = valor;

        linha.appendChild(celula);
      });

      corpo.appendChild(linha);
    });

    /*
     * Atualiza a quantidade de alunos apresentados.
     */
    AlunoView.atualizarTotal(alunos.length);
  },

  /*
   * Apresenta os dados em formato JSON.
   */
  exibirJSON(alunos) {
    AlunoView.elementos.saidaJson.textContent = JSON.stringify(alunos, null, 2);
  },
};
