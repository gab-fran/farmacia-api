import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import ClienteController from "./controller/ClienteController.js";
import MedicamentoController from "./controller/MedicamentoController.js";

const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

/**
 * Endpoints (rotas) para Clientes
 */
router.get("/api/clientes", ClienteController.todos);
router.post("/api/clientes", ClienteController.novo);
router.get("/api/clientes/:cpf", ClienteController.cliente);

/**
 * Endpoints (rotas) para Medicamentos
 */
router.get("/api/medicamentos", MedicamentoController.todos);
router.get("/api/medicamentos/nome/:nome", MedicamentoController.listarMedicamentoNome);
router.get("/api/medicamentos/principio/:principioAtivo", MedicamentoController.listarMedicamentoPrincipioAtivo);
router.post("/api/medicamentos", MedicamentoController.cadastrarMedicamento);

export { router }; // Exporta o roteador
