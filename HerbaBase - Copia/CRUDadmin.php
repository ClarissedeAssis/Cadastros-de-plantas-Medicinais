<?php
    include_once "Bd.php";

    // CRUDadmin.php
function salvarUsuario($nome, $email, $senha, $arquivoFotoUsuario) {
    // Conectar ao banco de dados
    $conexao = new PDO('mysql:host=localhost;dbname=HerbaBase', 'root', '');
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparar a consulta SQL
    $sql = "INSERT INTO Usuario (nome, email, senha, arquivoFotoUsuario) VALUES (:nome, :email, :senha, :arquivoFotoUsuario)";
    $sentenca = $conexao->prepare($sql);

    // Hash da senha para segurança
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Vincular valores
    $sentenca->bindValue(':nome', $nome);
    $sentenca->bindValue(':email', $email);
    $sentenca->bindValue(':senha', $senhaHash);
    $sentenca->bindValue(':arquivoFotoUsuario', $arquivoFotoUsuario);

    // Executar a consulta
    $sentenca->execute();

    // Fechar a conexão
    $conexao = null;

    // Retornar a quantidade de linhas afetadas
    return $sentenca->rowCount();
}

    



    function listarUsuario(){
        $sql = "SELECT * FROM Usuario;";

        $conexao = criarConexao();
		$sentenca = $conexao->prepare($sql);
	
		$sentenca->execute(); 
		$conexao = null;
        return $sentenca->fetchAll();
    }

    function buscarUsuarioPorId($id){
        $sql = "SELECT * FROM Usuario WHERE id = :id;";

        $conexao = criarConexao();
        
        $sentenca = $conexao->prepare($sql);
        $sentenca->bindValue(':id', $id); 
    
        $sentenca->execute(); 
        $conexao = null;
        
        return $sentenca->fetch();
    }

    function verificarUsuario($id){
        $sql = "SELECT * FROM Usuario WHERE id <> :id;";

        $conexao = criarConexao();
        $sentenca = $conexao->prepare($sql);	 		
        $sentenca->bindValue(':id', $id); 				

        $sentenca->execute(); 
        $conexao = null;

        return $sentenca->rowCount();
    } 


?>   