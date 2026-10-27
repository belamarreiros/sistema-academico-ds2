/*
 * Importa o Express para criar um Router.
 */
import express from "express";

/*
 * Importa o Controller de alunos.
 */
import AlunoController from "../controller/aluno-controller.js";

/*
 * Cria um roteador específico para alunos.
 */
const router = express.Router();

/*
 * Rota de listagem.
 *
 * Como o Router será registrado em /api/alunos,
 * esta rota representará:
 *
 * GET /api/alunos
 */
router.get("/", AlunoController.listar);

/*
 * Rota de cadastro.
 *
 * Como o Router será registrado em /api/alunos,
 * esta rota representará:
 *
 * POST /api/alunos
 */
router.post("/", AlunoController.cadastrar);

/*
 * Exporta o Router para ser utilizado
 * pela aplicação Express.
 */
export default router;
