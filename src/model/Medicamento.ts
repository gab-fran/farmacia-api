import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Medicamento {
    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private principioAtivo: string;
    private dataValidade: Date;
    private preco: number;

    constructor(
        _nome: string,
        _fabricante: string,
        _principioAtivo: string,
        _dataValidade: Date,
        _preco: number
    ) {
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.principioAtivo = _principioAtivo;
        this.dataValidade = _dataValidade;
        this.preco = _preco;
    }

    // Getters e Setters
    public getIdMedicamento(): number {
        return this.idMedicamento;
    }

    public setIdMedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getFabricante(): string {
        return this.fabricante;
    }

    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }

    public getPrincipioAtivo(): string {
        return this.principioAtivo;
    }

    public setPrincipioAtivo(principioAtivo: string): void {
        this.principioAtivo = principioAtivo;
    }

    public getDataValidade(): Date {
        return this.dataValidade;
    }

    public setDataValidade(dataValidade: Date): void {
        this.dataValidade = dataValidade;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

    static async listarMedicamentos(): Promise<Array<Medicamento> | null> {
        try {
            let listaDeMedicamentos: Array<Medicamento> = [];
            const querySelectMedicamentos = `SELECT * FROM Medicamento;`;
            const respostaBD = await database.query(querySelectMedicamentos);

            respostaBD.rows.forEach((medicamentoBD) => {
                const novoMedicamento: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.fabricante,
                    medicamentoBD.principio_ativo,
                    medicamentoBD.data_validade,
                    medicamentoBD.preco
                );
                novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);

                listaDeMedicamentos.push(novoMedicamento);
            });
            return listaDeMedicamentos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return null;
        }
    }

    static async cadastrarMedicamento(
        medicamento: MedicamentoDTO
    ): Promise<boolean> {
        try {
            const queryInsertMedicamento = `INSERT INTO Medicamento (nome, fabricante, principio_ativo, data_validade, preco)
                VALUES
                ($1, $2, $3, $4, $5)
                RETURNING id_medicamento;`;

            const respostaBD = await database.query(queryInsertMedicamento, [
                medicamento.nome.toUpperCase(),
                medicamento.fabricante,
                medicamento.principioAtivo,
                medicamento.dataValidade,
                medicamento.preco,
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(
                    `Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento}`
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async listarMedicamentoNome(
        nome: string
    ): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = `SELECT * FROM Medicamento WHERE nome = $1;`;
            const respostaBD = await database.query(querySelectMedicamento, [nome]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].principio_ativo,
                    respostaBD.rows[0].data_validade,
                    respostaBD.rows[0].preco
                );
                medicamento.setIdMedicamento(respostaBD.rows[0].id_medicamento);

                return medicamento;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar medicamento no banco de dados. ${error}`);
            return null;
        }
    }

    static async listarMedicamentoPrincipioAtivo(
        principioAtivo: string
    ): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = `SELECT * FROM Medicamento WHERE principio_ativo = $1;`;
            const respostaBD = await database.query(querySelectMedicamento, [
                principioAtivo,
            ]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].principio_ativo,
                    respostaBD.rows[0].data_validade,
                    respostaBD.rows[0].preco
                );
                medicamento.setIdMedicamento(respostaBD.rows[0].id_medicamento);

                return medicamento;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar medicamento no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Medicamento;
