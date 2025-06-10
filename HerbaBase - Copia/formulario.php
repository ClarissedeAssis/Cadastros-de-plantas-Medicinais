<?php		
    include_once "CRUD.php";	
    session_start();

    $id = 0;
	$nomePopular = "";
	$nomeCientifico = "";
	$origem = "";
    $aplicacoesMedicinais = "";
    $arquivoFoto = "";
    
    if(isset($_SESSION['email'])) {
        if(isset($_GET['id']) ){
            $registro = buscarPlantaPorId($_GET['id']);
    
            $id = $registro['id'];
            $nomePopular = $registro['nomePopular'];
            $nomeCientifico = $registro['nomeCientifico'];
            $origem = $registro['origem'];
            $aplicacoesMedicinais = $registro['aplicacoesMedicinais'];
            $arquivoFoto = $registro['arquivoFoto'];
        }else{
            if (isset($_POST['id'])) {
                $registro = buscarPlantaPorId($_POST['id']);
    
                $id = $registro['id'];
                $nomePopular = $registro['nomePopular'];
                $nomeCientifico = $registro['nomeCientifico'];
                $origem = $registro['origem'];
                $aplicacoesMedicinais = $registro['aplicacoesMedicinais'];
                $arquivoFoto = $registro['arquivoFoto'];
            }
        }
    } else { 
        echo "<script>alert('Ocorreu um erro! Faça login para acessar esta página');</script>";
        echo "<script>window.location.replace('login.php');</script>";
    }
    
?>

<html>

<head>
	<meta charset="utf-8" />
	<title> Formulário </title>
</head>
<style>
       body {
            background-color: rgb(34, 34, 34);
            color: white;
            max-width: 1200px;
            margin: 0 auto;
            padding: 15px;
        }

        header {
            display: flex; /* facilita posicionar os elementos */
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
            display: inline-block; /* faz todos os elementos ficarem na mesma linha */
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

        #arquivoFoto {
            display: none; /* Oculta o botão de seleção de arquivo */
        }
</style>
<body>
<header>
        <div>
            <h1>HerbaBase</h1>
        </div>

        <ul>
            <a href="tabela.php"><li>Plantas</li></a>
            <a href="cadastro.php"><li>Cadastrar Admin</li></a>
            <a href="dados.php"><li>Dados</li></a>
            <a id="finalizar-button" href="login.php"><li>Finalizar sessão</li></a>
        </ul>
    </header>
    <main>
        <aside>
            <h2><span>Cadastre</span></h2>
            <h2>uma Planta</h2>
        </aside>

        <form action="Salvar.php" method="post" enctype="multipart/form-data">
        <input id="arquivoFoto" name="arquivoFoto" type="file" accept="image/*">

        <img id="preview" src="arquivos/fotoPlantaPerfil.png" alt="Foto de perfil padrão">

            <input type="hidden" id="id" name="id" value="<?php echo $id ?>">
            <input id="nomePopular" name="nomePopular" value="<?php echo $nomePopular ?>" type="text"  placeholder="Selecione o nome popular">
            <input id="nomeCientifico" name="nomeCientifico" value="<?php echo $nomeCientifico ?>" type="text" placeholder="Informe o Nome Cientifico">
            <input id="origem" name="origem" value="<?php echo $origem ?>" type="text" placeholder="Informe a origem da planta" >
            <input id="aplicacoesMedicinais" name="aplicacoesMedicinais" value="<?php echo $aplicacoesMedicinais ?>" type="text" placeholder="Informe a aplicação medicinal" >

            <input type="submit" value="Salvar">
        </form>
    </main>
</body>
</html>

<script>
    document.getElementById('preview').addEventListener('click', function() {
        document.getElementById('arquivoFoto').click();
    });

    document.getElementById('arquivoFoto').addEventListener('change', function() {
        var reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    });
</script>
