<?php
    include_once "Bd.php";

    function salvarPlanta($id, $nomePopular, $nomeCientifico, $origem, $aplicacoesMedicinais, $arquivoFoto){
        $conexao = criarConexao();
        $sentenca = null;
    
        if($id > 0){
            $sql = "UPDATE Planta SET nomePopular = :nomePopular, nomeCientifico = :nomeCientifico, origem = :origem, aplicacoesMedicinais = :aplicacoesMedicinais, arquivoFoto = :arquivoFoto WHERE id = :id;";
            $sentenca = $conexao->prepare($sql);
            $sentenca->bindValue(':id', $id); 
            $sentenca->bindValue(':nomePopular', $nomePopular); 
            $sentenca->bindValue(':nomeCientifico', $nomeCientifico); 
            $sentenca->bindValue(':origem', $origem); 
            $sentenca->bindValue(':aplicacoesMedicinais', $aplicacoesMedicinais); 
            $sentenca->bindValue(':arquivoFoto', $arquivoFoto); 
        } else {
            $sql = "INSERT INTO Planta (nomePopular, nomeCientifico, origem, aplicacoesMedicinais, arquivoFoto) VALUES (:nomePopular, :nomeCientifico, :origem, :aplicacoesMedicinais, :arquivoFoto);";
            $sentenca = $conexao->prepare($sql);
            $sentenca->bindValue(':nomePopular', $nomePopular);
            $sentenca->bindValue(':nomeCientifico', $nomeCientifico);
            $sentenca->bindValue(':origem', $origem);
            $sentenca->bindValue(':aplicacoesMedicinais', $aplicacoesMedicinais);
            $sentenca->bindValue(':arquivoFoto', $arquivoFoto);
        }
    
        $sentenca->execute();     
        fecharConexao();   
        return $sentenca->rowCount();
    }
    



    function listarPlanta(){
        $sql = "SELECT * FROM Planta;";

        $conexao = criarConexao();
		$sentenca = $conexao->prepare($sql);
	
		$sentenca->execute(); 
		$conexao = null;
        return $sentenca->fetchAll();
    }

    function buscarPlantaPorId($id){
        $sql = "SELECT * FROM Planta WHERE id = :id;";

        $conexao = criarConexao();
        
        $sentenca = $conexao->prepare($sql);
        $sentenca->bindValue(':id', $id); 
    
        $sentenca->execute(); 
        $conexao = null;
        
        return $sentenca->fetch();
    }

    function verificarPlanta($id){
        $sql = "SELECT * FROM Planta WHERE id <> :id;";

        $conexao = criarConexao();
        $sentenca = $conexao->prepare($sql);	 		
        $sentenca->bindValue(':id', $id); 				

        $sentenca->execute(); 
        $conexao = null;

        return $sentenca->rowCount();
    } 


?>   