<?php
session_start();

$email = $_POST['email'] ;
$senha = $_POST['senha'] ;



try {
    $conexao = new PDO('mysql:host=localhost;dbname=HerbaBase', 'root', '');
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}


function verificarUsuario($email, $senha, $conexao) {
    $sql = "SELECT senha FROM Usuario WHERE email = :email";
    $sentenca = $conexao->prepare($sql);
    $sentenca->bindValue(':email', $email);
    $sentenca->execute();
    
   
    if ($sentenca->rowCount() > 0) {
       
        $user = $sentenca->fetch(PDO::FETCH_ASSOC);
        $senhaHash = $user['senha'];

      
        return password_verify($senha, $senhaHash);
    }

    return false;
}


if (verificarUsuario($email, $senha, $conexao)) {
    $_SESSION['email'] = $email;
    echo "<script>alert('Usuário encontrado e autenticado.');</script>";
    echo "<script>window.location.replace('menu.php');</script>";
} else {
    echo "<script>alert('Login não encontrado!');</script>";
    echo "<script>window.location.replace('login.php');</script>";
}

$conexao = null;
?>
