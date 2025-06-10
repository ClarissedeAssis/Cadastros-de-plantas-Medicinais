<?php
    $conexao = NULL;
    
    function criarConexao(){
        $conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
        return $conexao;
    }

    function fecharConexao(){
        $conexao = NULL;
    }7
?>    