<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Plantas</title>
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
        justify-content: space-between;
        align-items: center;
    }

    #finalizar-button {
        border: 2px solid green;
        padding: 10px;
        border-radius: 15px;
        text-decoration: none;
        color: white;
    }

    #finalizar-button:hover {
        background-color: green;
    }

    h1 {
        font-weight: 200;
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

    main {
        margin-top: 50px;
    }

    .task-list {
        list-style-type: none;
        padding: 0;
    }

    .task-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }

    .task-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        flex: 1;
    }

    .task-icon {
        margin-right: 15px;
        border-radius: 5px;
    }

    .task-label {
        font-size: 1.1em;
    }

    .task-options {
        display: flex;
        align-items: center;
        gap: 10px; /* Adiciona um espaço de 10px entre os botões */
    }

    .delete-button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
    }

    .fab {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }

    .fab-button {
        background-color: green;
        color: white;
        font-size: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        text-decoration: none;
        transition: background-color 0.3s, color 0.3s;
    }

    .fab-button:hover {
        background-color: darkgreen;
        color: white;
    }

    .edit-button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        text-decoration: none;
    }

    .edit-button:hover {
        background-color: #0056b3;
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
    <ul class="task-list">
        <?php
        session_start();

        if (!isset($_SESSION['email'])) {
            echo "<script>alert('Ocorreu um erro! Faça login para acessar esta página');</script>";
            echo "<script>window.location.replace('login.php');</script>";
        }

        $conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
        $sql = "SELECT * FROM Planta";
        $sentenca = $conexao->prepare($sql);

        $sentenca->execute();
        $registros = $sentenca->fetchAll();
        $conexao = null;

        foreach ($registros as $registro) {
            // Ajuste o caminho da imagem para o diretório 'arquivos/'
            $caminhoImagem = "arquivos/{$registro['arquivoFoto']}"; // Verifique se 'arquivoFoto' é o nome correto da coluna no banco
            echo "<li class='task-item'>";
            echo "<a class='task-link' href='detalhes.php?id={$registro['id']}'>";

            // Certifique-se de que o arquivo existe
            if (file_exists($caminhoImagem)) {
                echo "<img src='{$caminhoImagem}' alt='Foto da planta' class='task-icon' width='50'>";
            } else {
                echo "<span class='task-icon'>Imagem não disponível</span>";  // Exemplo de alternativa
            }

            echo "<span class='task-label'>{$registro['nomePopular']}</span>";
            echo "</a>";
            echo "<div class='task-options'>";
            echo "<a href='formulario.php?id={$registro['id']}' class='edit-button'>Editar</a>";
            echo "<button class='delete-button' onclick=\"window.location.href='Excluir.php?id={$registro['id']}'\">Excluir</button>";
            echo "</div>";
            echo "</li>";
        }
        ?>

        <!-- Novo botão verde com símbolo de "+" -->
        <a href="formulario.php" class="fab-button">
            +
        </a>
    </ul>
</main>

</body>
</html>
