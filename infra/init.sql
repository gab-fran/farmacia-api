CREATE TABLE Cliente (
id_cliente INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nome VARCHAR(200) NOT NULL,
cpf VARCHAR(20) UNIQUE NOT NULL,
data_nascimento DATE NOT NULL,
telefone VARCHAR(20),
email VARCHAR(100)
);


CREATE TABLE Medicamento (
id_medicamento INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
fabricante VARCHAR(100) NOT NULL,
principio_ativo VARCHAR(100) NOT NULL,
data_validade DATE NOT NULL,
preco DECIMAL(10,2) NOT NULL
);

INSERT INTO Cliente (nome, cpf, data_nascimento, telefone, email) VALUES
('Ana Beatriz Silva', '123.456.789-00', '1998-05-10', '(11) 98877-6655', 'ana.silva@gmail.com'),
('Carlos Henrique Santos', '987.654.321-00', '1985-09-23', '(21) 97766-5544', 'carlos.henrique@yahoo.com'),
('Fernanda Oliveira', '321.654.987-11', '1992-12-01', '(31) 99900-1122', 'fernanda.oli@hotmail.com'),
('João Pedro Almeida', '654.987.321-22', '2000-07-15', '(41) 98888-7766', 'joao.pedro@gmail.com'),
('Mariana Costa', '111.222.333-44', '1988-03-09', '(51) 97777-8899', 'mariana.costa@outlook.com');

INSERT INTO Medicamento (nome, fabricante, principio_ativo, data_validade, preco) VALUES
('Paracetamol 500mg', 'Medley', 'Paracetamol', '2026-05-01', 12.50),
('Amoxicilina 500mg', 'EMS', 'Amoxicilina', '2025-11-15', 25.90),
('Dipirona Sódica 1g', 'Neo Química', 'Dipirona', '2027-01-10', 8.75),
('Ibuprofeno 400mg', 'Bayer', 'Ibuprofeno', '2026-03-20', 15.30),
('Losartana 50mg', 'Eurofarma', 'Losartana Potássica', '2028-02-05', 19.99),
('Omeprazol 20mg', 'Aché', 'Omeprazol', '2027-09-18', 14.40),
('Cetirizina 10mg', 'EMS', 'Cetirizina', '2026-12-12', 9.80),
('Metformina 850mg', 'Neo Química', 'Metformina', '2027-06-06', 17.60);

SELECT * FROM Cliente;
SELECT * FROM Medicamento;