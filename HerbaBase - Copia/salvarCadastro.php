<?php  
include_once "CRUDadmin.php";

session_start();

$conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');

// Definir variáveis e obter valores do POST
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$senhaCopia = $_POST['senhaCopia'];
$arquivoFotoUsuario = $_FILES['arquivoFotoUsuario'];

// Diretórios
$diretorioLocal = "arquivos/";
$diretorioDestino = "C:/Users/Usuario/package/src/assets/";

// Verificar se o e-mail já existe
$sql = "SELECT COUNT(*) FROM Usuario WHERE email = :email";
$sentenca = $conexao->prepare($sql);
$sentenca->bindParam(':email', $email);
$sentenca->execute();
$emailExistente = $sentenca->fetchColumn();

if ($emailExistente > 0) {
    echo "<script>alert('Este e-mail já está cadastrado.');</script>";
    echo "<script>window.location.replace('Cadastro.php');</script>";
    exit;
} else {
    if ($senha === $senhaCopia) {
        $tamanhoArquivo = $arquivoFotoUsuario['size'];
        $nomeArquivoOriginal = $arquivoFotoUsuario['name'];
        $extensaoArquivo = strtolower(pathinfo($nomeArquivoOriginal, PATHINFO_EXTENSION));
        $tempArquivo = $arquivoFotoUsuario['tmp_name'];

        // Verificações
        $extensoesAceitas = ['png', 'jpg', 'jpeg'];
        if (!in_array($extensaoArquivo, $extensoesAceitas)) {
            echo "<script>alert('Formato de arquivo inválido. Apenas PNG, JPG e JPEG são permitidos.');</script>";
            echo "<script>window.location.replace('Cadastro.php');</script>";
            exit;
        }

        if ($tamanhoArquivo > 10 * 1024 * 1024) {
            echo "<script>alert('O arquivo excede o tamanho máximo de 10MB.');</script>";
            echo "<script>window.location.replace('Cadastro.php');</script>";
            exit;
        }

        // Criar diretórios se não existirem
        if (!is_dir($diretorioLocal)) {
            mkdir($diretorioLocal, 0755, true);
        }

        if (!is_dir($diretorioDestino)) {
            mkdir($diretorioDestino, 0755, true);
        }

        // Nome único
        $nomeArquivoUnico = uniqid() . '-' . $nomeArquivoOriginal;
        $caminhoLocal = $diretorioLocal . $nomeArquivoUnico;
        $caminhoDestino = $diretorioDestino . $nomeArquivoUnico;

        // Mover para o diretório local
        if (move_uploaded_file($tempArquivo, $caminhoLocal)) {
            // Copiar para o diretório destino
            if (copy($caminhoLocal, $caminhoDestino)) {
                // Salvar no banco
                $quantidade = salvarUsuario($nome, $email, $senha, $nomeArquivoUnico);

                if ($quantidade > 0) {
                    echo "<script>alert('Cadastro realizado com sucesso!');</script>";
                    echo "<script>window.location.replace('login.php');</script>";
                } else {
                    echo "<script>alert('Erro ao cadastrar usuário');</script>";
                    echo "<script>window.location.replace('Cadastro.php');</script>";
                }
            } else {
                echo "<script>alert('Erro ao copiar o arquivo para o destino');</script>";
                echo "<script>window.location.replace('Cadastro.php');</script>";
            }
        } else {
            echo "<script>alert('Erro ao mover o arquivo');</script>";
            echo "<script>window.location.replace('Cadastro.php');</script>";
        }
    } else {
        echo "<script>alert('As senhas não coincidem');</script>";
        echo "<script>window.location.replace('Cadastro.php');</script>";
    }
}
?>
