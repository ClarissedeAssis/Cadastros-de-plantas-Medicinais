<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Detalhes da Planta</title>
  <style>
    body {
      background-color: rgb(34, 34, 34);
      color: white;
      max-width: 1200px;
      margin: 0 auto;
      padding: 15px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .plant-details {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .plant-details img {
      max-width: 200px;
      margin-right: 20px;
      border-radius: 10px;
    }

    .plant-details h1 {
      font-size: 2em;
      margin: 0;
    }

    .plant-details p {
      font-size: 1.2em;
    }

    .back-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }

    .back-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <?php
    // Conexão com o banco de dados
    $conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
    
    // Obtém o ID da planta a partir do parâmetro da URL
    if (isset($_GET['id'])) {
      $id = intval($_GET['id']);
      
      // Prepara e executa a consulta SQL
      $sql = "SELECT * FROM Planta WHERE id = :id";
      $sentenca = $conexao->prepare($sql);
      $sentenca->bindParam(':id', $id, PDO::PARAM_INT);
      $sentenca->execute();
      
      // Obtém o registro
      $registro = $sentenca->fetch();
      
      if ($registro) {
        $caminhoImagem = "arquivos/{$registro['arquivoFoto']}";
        echo "<div class='plant-details'>";
        echo "<img src='{$caminhoImagem}' alt='Foto da planta'>";
        echo "<div>";
        echo "<h1>{$registro['nomePopular']}</h1>";
        echo "<p><strong>Nome Científico:</strong> {$registro['nomeCientifico']}</p>";
        echo "<p><strong>Origem:</strong> {$registro['origem']}</p>";
        echo "<p><strong>Aplicações Medicinais:</strong> {$registro['aplicacoesMedicinais']}</p>";
        echo "</div>";
        echo "</div>";
      } else {
        echo "<p>Planta não encontrada.</p>";
      }
    } else {
      echo "<p>ID da planta não fornecido.</p>";
    }
    
    $conexao = null;
    ?>
    <a href="tabela.php" class="back-button">Voltar</a>
  </div>
</body>
</html>
