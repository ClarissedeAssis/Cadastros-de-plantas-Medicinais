<?php
$id = $_GET['id'];

try {
    // Conexão com o banco de dados
    $conexao = new PDO('mysql:host=localhost; dbname=HerbaBase', 'root', '');
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Excluir os detalhes associados à planta na tabela PlantaUsuario
    $sqlDetalhes = "DELETE FROM PlantaUsuario WHERE idPlanta = :id";
    $stmtDetalhes = $conexao->prepare($sqlDetalhes);
    $stmtDetalhes->bindValue(':id', $id, PDO::PARAM_INT);
    $stmtDetalhes->execute();

    // Excluir a planta
    $sqlPlanta = "DELETE FROM Planta WHERE id = :id";
    $stmtPlanta = $conexao->prepare($sqlPlanta);
    $stmtPlanta->bindValue(':id', $id, PDO::PARAM_INT);
    $stmtPlanta->execute();

    // Verificação de sucesso
    if ($stmtPlanta->rowCount() > 0) {
        echo "<script>alert('Registro excluído com sucesso!');</script>";
        echo "<script>window.location.replace('tabela.php');</script>";
    } else {
        echo "<script>alert('Erro ao excluir o registro');</script>";
        echo "<script>window.location.replace('tabela.php');</script>";
    }
} catch (PDOException $e) {
    echo "Erro ao excluir: " . $e->getMessage();
    exit; // Para a execução em caso de erro
}
?>
