DROP DATABASE HerbaBase;
CREATE DATABASE HerbaBase;
USE HerbaBase;

-- Tabela: usuario
CREATE TABLE usuario (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    idCategoria INT(11),
    arquivoFotoUsuario VARCHAR(255)
);

-- Tabela: planta
CREATE TABLE planta (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nomePopular VARCHAR(255) NOT NULL,
    nomeCientifico VARCHAR(255) NOT NULL,
    origem VARCHAR(255),
    aplicacoesMedicinais TEXT,
    arquivoFoto VARCHAR(255),
    avaliacaoGeral DECIMAL(3,1)
);

-- Tabela: categoria
CREATE TABLE categoria (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    idUsuario INT(11)
);

-- Tabela: plantaUsuario
CREATE TABLE plantaUsuario (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(11),
    idPlanta INT(11),
    descricao VARCHAR(255),
    avaliacao TINYINT(1) DEFAULT 0 
);

-- Tabela: categoriaPlanta (tabela de relação entre planta e categoria)
CREATE TABLE categoriaPlanta (
    idPlanta INT(11),
    idCategoria INT(11),
    PRIMARY KEY (idPlanta, idCategoria)
);

-- Adicionando chaves estrangeiras
ALTER TABLE usuario 
    ADD CONSTRAINT usuarioCategoria FOREIGN KEY (idCategoria) REFERENCES categoria(id);

ALTER TABLE categoria 
    ADD CONSTRAINT categoriaUsuario FOREIGN KEY (idUsuario) REFERENCES usuario(id);

ALTER TABLE plantausuario 
    ADD CONSTRAINT plantausuarioUsuario FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    ADD CONSTRAINT plantausuarioPlanta FOREIGN KEY (idPlanta) REFERENCES planta(id);

ALTER TABLE categoriaplanta 
    ADD CONSTRAINT categoriaPlantaPlanta FOREIGN KEY (idPlanta) REFERENCES planta(id),
    ADD CONSTRAINT categoriaPlantaCategoria FOREIGN KEY (idCategoria) REFERENCES categoria(id);
    
ALTER TABLE plantaUsuario 
ADD CONSTRAINT unique_usuario_planta UNIQUE (idUsuario, idPlanta);