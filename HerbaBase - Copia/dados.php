<?php
session_start();

if (!isset($_SESSION['email'])) {
    echo "<script>alert('Faça login para acessar esta página');</script>";
    echo "<script>window.location.replace('login.php');</script>";
    exit;
}

$conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
$email = $_SESSION['email'];

$sql = "SELECT * FROM Usuario WHERE email = :email";
$stmt = $conexao->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->execute();
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

$conexao = null;
?>

<html>
<head>
    <meta charset="utf-8" />
    <title>Seus Dados</title>
    <style>
    body {
    background-color: #222;
    color: white;
    font-family: Arial;
    height: 100vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: #333;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

input, button {
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
}

img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 2px solid green;
    cursor: pointer;
}
    </style>

    
 
</head>
<body>
<a href="tabela.php" style="position: absolute; top: 20px; left: 20px; text-decoration: none;">
    <button style="
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
    ">← Voltar</button>
</a>

<form action="editar.php" method="POST" enctype="multipart/form-data">
    <img id="preview" src="arquivos/<?php echo $usuario['arquivoFotoUsuario'] ?: 'fotoPerfil.png'; ?>" alt="Foto de perfil">
    <input type="file" id="arquivoFotoUsuario" name="arquivoFotoUsuario" accept="image/*" style="display: none;">
    
    <input type="text" name="nome" value="<?php echo htmlspecialchars($usuario['nome']); ?>" required>
    <input type="email" name="email" value="<?php echo htmlspecialchars($usuario['email']); ?>" required>
    <input type="password" name="novaSenha" placeholder="Nova senha (deixe em branco para manter)">
    
    <input type="submit" value="Atualizar Dados">
</form>

<script>
    document.getElementById('preview').addEventListener('click', function() {
        document.getElementById('arquivoFotoUsuario').click();
    });

    document.getElementById('arquivoFotoUsuario').addEventListener('change', function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    });
</script>

</body>
</html>
