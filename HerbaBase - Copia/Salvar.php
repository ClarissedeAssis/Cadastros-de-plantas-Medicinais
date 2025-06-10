<?php
include_once "CRUD.php";

session_start();

// Verificação de sessão de login
if (!isset($_SESSION['email'])) {
    echo "<script>alert('Ocorreu um erro! Faça login para acessar esta página');</script>";
    echo "<script>window.location.replace('login.php');</script>";
    exit;
}

$id = $_POST['id'] ?? null;
$nomePopular = $_POST['nomePopular'] ?? '';
$nomeCientifico = $_POST['nomeCientifico'] ?? '';
$origem = $_POST['origem'] ?? '';
$aplicacoesMedicinais = $_POST['aplicacoesMedicinais'] ?? '';
$arquivoFoto = $_FILES['arquivoFoto'] ?? null;

if (empty($nomePopular) || empty($nomeCientifico) || empty($origem) || empty($aplicacoesMedicinais) || empty($arquivoFoto['name'])) {
    echo "<script>alert('Todos os campos são obrigatórios!');</script>";
    exit;
}

$diretorioFixoArquivos = "C:/xampp/htdocs/HerbaBase - Copia (1)/HerbaBase - Copia/arquivos/";
$diretorioFixoFotoplanta = "C:/Users/Usuario/package/uploads/fotos/";
$nomeArquivo = $arquivoFoto['name'];
$tamanhoArquivo = $arquivoFoto['size'];
$extensaoArquivo = pathinfo($nomeArquivo, PATHINFO_EXTENSION);
$tempArquivo = $arquivoFoto['tmp_name'];

// Gerar nome único para o arquivo
$nomeArquivoUnico = uniqid() . '-' . $nomeArquivo;
$caminhoArquivo1 = $diretorioFixoArquivos . $nomeArquivoUnico;
$caminhoArquivo2 = $diretorioFixoFotoplanta . $nomeArquivoUnico;

// Verificar se os diretórios existem, se não, cria
if (!is_dir($diretorioFixoArquivos)) {
    if (!mkdir($diretorioFixoArquivos, 0755, true)) {
        echo "<script>alert('Erro ao criar o diretório de arquivos');</script>";
        exit;
    }
}

if (!is_dir($diretorioFixoFotoplanta)) {
    if (!mkdir($diretorioFixoFotoplanta, 0755, true)) {
        echo "<script>alert('Erro ao criar o diretório fotoplanta');</script>";
        exit;
    }
}

// Aceitar extensões PNG, JPG, JPEG
$extensoesAceitas = ['png', 'jpg', 'jpeg'];
if (!in_array(strtolower($extensaoArquivo), $extensoesAceitas)) {
    echo "<script>alert('Formato de arquivo inválido. Somente arquivos PNG, JPG e JPEG são permitidos.');</script>";
    echo "<script>window.location.replace('formulario.php');</script>";
    exit;
}

// Permitir arquivos de até 10MB
if ($tamanhoArquivo > 10 * 1024 * 1024) {
    echo "<script>alert('O arquivo excede o tamanho máximo permitido (10MB).');</script>";
    echo "<script>window.location.replace('formulario.php');</script>";
    exit;
}

// Tentar mover o arquivo para o primeiro diretório
if (move_uploaded_file($tempArquivo, $caminhoArquivo1)) {
    // Agora copie o arquivo para o segundo diretório
    if (copy($caminhoArquivo1, $caminhoArquivo2)) {
        // Chamar a função para salvar os dados da planta no banco de dados
        $quantidade = salvarPlanta($id, $nomePopular, $nomeCientifico, $origem, $aplicacoesMedicinais, $nomeArquivoUnico);

        if ($quantidade > 0) {
            echo "<script>alert('Registro salvo com sucesso!');</script>";
            echo "<script>window.location.replace('tabela.php');</script>";
        } else {
            echo "<script>alert('Nada foi modificado');</script>";
            echo "<script>window.location.replace('formulario.php');</script>";
        }
    } else {
        
        echo "<script>window.location.replace('formulario.php');</script>";
        exit;
    }
} else {
    
    echo "<script>window.location.replace('formulario.php');</script>";
    exit;
}

?>
