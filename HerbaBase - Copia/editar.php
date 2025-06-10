<?php
session_start();

if (!isset($_SESSION['email'])) {
    echo "<script>alert('Faça login para acessar esta página');</script>";
    echo "<script>window.location.replace('login.php');</script>";
    exit;
}

$conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
$emailAntigo = $_SESSION['email'];

// Dados do formulário
$novoNome = $_POST['nome'];
$novoEmail = $_POST['email'];
$novaSenha = $_POST['novaSenha'];
$arquivoFoto = $_FILES['arquivoFotoUsuario'];

// Upload de imagem
$novoNomeArquivo = null;
if ($arquivoFoto['size'] > 0) {
    $extensao = strtolower(pathinfo($arquivoFoto['name'], PATHINFO_EXTENSION));
    $extensoesPermitidas = ['jpg', 'jpeg', 'png'];

    if (!in_array($extensao, $extensoesPermitidas)) {
        echo "<script>alert('Extensão inválida. Use JPG, JPEG ou PNG');</script>";
        echo "<script>window.location.replace('dadosUsuario.php');</script>";
        exit;
    }

    if (!is_dir("arquivos/")) {
        mkdir("arquivos/", 0755, true);
    }

    $novoNomeArquivo = uniqid() . '-' . basename($arquivoFoto['name']);
    $caminho = "arquivos/" . $novoNomeArquivo;

    if (!move_uploaded_file($arquivoFoto['tmp_name'], $caminho)) {
        echo "<script>alert('Erro ao salvar a imagem');</script>";
        echo "<script>window.location.replace('dados.php');</script>";
        exit;
    }
}

// Atualizar dados
$camposAtualizar = "nome = :nome, email = :email";
$params = [
    ':nome' => $novoNome,
    ':email' => $novoEmail,
    ':emailAntigo' => $emailAntigo
];

if (!empty($novaSenha)) {
    $camposAtualizar .= ", senha = :senha";
    $params[':senha'] = $novaSenha;
}

if ($novoNomeArquivo) {
    $camposAtualizar .= ", arquivoFotoUsuario = :foto";
    $params[':foto'] = $novoNomeArquivo;
}

$sql = "UPDATE Usuario SET $camposAtualizar WHERE email = :emailAntigo";
$stmt = $conexao->prepare($sql);
$resultado = $stmt->execute($params);

if ($resultado) {
    $_SESSION['email'] = $novoEmail; // atualiza o email da sessão
    echo "<script>alert('Dados atualizados com sucesso!');</script>";
} else {
    echo "<script>alert('Erro ao atualizar os dados');</script>";
}

echo "<script>window.location.replace('login.php');</script>";
?>
