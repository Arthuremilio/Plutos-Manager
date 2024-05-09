CREATE DATABASE Plutos_BD;
go

USE Plutos_BD;
go

CREATE TABLE Usuarios (
    ID INT PRIMARY KEY IDENTITY(1,1),
    NomeUsuario NVARCHAR(100) NOT NULL,
    Documento NVARCHAR(20),
    Telefone NVARCHAR(20),
    Email NVARCHAR(100),
    Logradouro NVARCHAR(255),
    CEP NVARCHAR(10),
    Numero NVARCHAR(20),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
    Pais NVARCHAR(50),
    Usuario NVARCHAR(50) NOT NULL,
    Senha NVARCHAR(100) NOT NULL, 
    Vencimento DATE
);
go

CREATE TABLE Categorias (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Descricao NVARCHAR(255) NOT NULL,
	UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);
go

CREATE TABLE FormasPagamento (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Descricao NVARCHAR(255) NOT NULL,
	UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);
go

CREATE TABLE Pessoas (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Documento NVARCHAR(20),
    Telefone NVARCHAR(20),
    Email NVARCHAR(100),
    CEP NVARCHAR(10),
    Logradouro NVARCHAR(255),
    Numero NVARCHAR(20),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
    Pais NVARCHAR(50),
    UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);
go

CREATE TABLE Produtos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Descricao NVARCHAR(255) NOT NULL,
    Custo FLOAT NOT NULL,
    Preco FLOAT NOT NULL,
    CategoriaID INT,
    UsuarioID INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);
go

CREATE TABLE Vendas (
    ID INT PRIMARY KEY IDENTITY(1,1),
    IDPessoa INT,
    ValorTotal FLOAT NOT NULL,
    Data DATE,
    IDFormaPagamento INT,
    IDUsuario INT,
    FOREIGN KEY (IDPessoa) REFERENCES Pessoas(ID),
    FOREIGN KEY (IDFormaPagamento) REFERENCES FormasPagamento(ID),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(ID)
);
go

CREATE TABLE ItensVenda (
    ID INT PRIMARY KEY IDENTITY(1,1),
    IDVenda INT,
    IDProduto INT,
    Quantidade INT,
    ValorTotal FLOAT NOT NULL,
    FOREIGN KEY (IDVenda) REFERENCES Vendas(ID),
    FOREIGN KEY (IDProduto) REFERENCES Produtos(ID)
);
go