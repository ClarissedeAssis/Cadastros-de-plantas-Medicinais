<?php
    session_start();

    if(!isset($_SESSION['email'])) { 
        echo "<script>alert('Ocorreu um erro! Faça login para acessar esta página');</script>";
        echo "<script>window.location.replace('login.php');</script>";
    }

    $conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
    $sql = "SELECT * FROM Usuario";
    $sentenca = $conexao->prepare($sql);

    $sentenca->execute();

    $conexao = null;
?>

<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <style>
        body {
            background-color: rgb(34, 34, 34);
            color: white;
            max-width: 1200px;
            margin: 0 auto;
            padding: 15px;
        }

        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #title {
            flex-direction: column;
            line-height: 10px;
        }

        #finalizar-button {
            border: 2px solid green;
            padding: 10px;
            border-radius: 15px;
        }

        #finalizar-button:hover {
            background-color: green;
            color: white;
        }

        h1 {
            font-weight: 200;
        }

        main {
            display: flex;
            flex-direction: row;
            margin-top: 50px;
        }

        h2 {
            font-size: 56px;
            line-height: 10px;
        }

        span {
            color: green;
        }

        p {
            line-height: 20px;
            max-width: 500px;
        }

        img {
            width: 620px;
            margin-top: -100px;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 70%;
            margin-left: 80px;
        }

        form [type="submit"] {
            height: 50px;
            width: 50%;
            background-color: green;
            color: white;
            font-weight: bold;
        }

        form [type="submit"]:hover {
            cursor: pointer;
        }

        input {
            margin-top: 20px;
            height: 20px;
            padding: 15px;
            border-radius: 20px;
            border: none;
            font-size: 15px;
        }

        li {
            display: inline-block;
            margin: 20px;
        }

        a {
            color: white;
        }

        a:hover {
            color: green;
            transition: 0.3s all;
        }

        #preview {
    margin-top: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%; /* deixa redondo */
    object-fit: cover;  /* para preencher sem distorcer */
    cursor: pointer;
    border: 2px solid green;
}


        #arquivoFotoUsuario {
            display: none;
        }
    </style>
</head>
<body>

<header>
    <div>
        <h1>HerbaBase</h1>
    </div>

    <ul>
        <a href="tabela.php"><li>Plantas</li></a>
        <a href="cadastro.php"><li>Cadastrar Admin</li></a>
        <a href="dados.php"><li>Dados</li></a>
        <a id="finalizar-button" href="FinalizarSessao.php"><li>Finalizar sessão</li></a>
    </ul>
</header>

<main>
    <aside>
        <h2><span>Cadastre</span></h2>
        <h2>um Admin</h2>
    </aside>

    <form id="formulario" action="salvarCadastro.php" method="post" enctype="multipart/form-data">
        <input id="arquivoFotoUsuario" name="arquivoFotoUsuario" type="file" accept="image/*">
        <img id="preview" src="arquivos/fotoPerfil.png" alt="Foto de perfil padrão">
        
        <input id="nome" name="nome" value="" type="text" placeholder="Nome de usuário">
        <input id="email" name="email" type="email" placeholder="E-mail">
        <input id="senha" name="senha" type="password" placeholder="Senha">
        <input id="senhaCopia" name="senhaCopia" value="" type="password" placeholder="Confirme a senha">
        <input type="submit" value="Cadastrar">
    </form>
</main>

<script>
  document.getElementById('preview').addEventListener('click', function() {
        document.getElementById('arquivoFotoUsuario').click();
    });

    document.getElementById('arquivoFotoUsuario').addEventListener('change', function() {
        var reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    });
</script>

</body>
</html>
