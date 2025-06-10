
$(document).ready(function () {
	$('#tabela').DataTable({
		language: {
			url: 'js/dataTables.pt_br.json'
		}
	});

	$('.cpf').mask('999.999.999-99');	
	$('.data').mask("00/00/0000");
});

function confirmarExclusao(codigo) {
	var resposta = confirm('Confirma a exclusão do registro?');

	if (resposta) {		
		$.ajax({
			url  : 'treinoExcluir.php',
			type : 'post',
			data : {
				id : codigo
			}
		})
		.done(function(resultado){
			if(resultado == 1){
				alert('Registro excluído com sucesso!');
				window.location.replace('treinoTabela.php');
			}else{
				if(resultado == 2){
					alert('Não é possível excluir treino com exercícios cadastrados.');
					window.location.replace('treinoTabela.php');
				}else{
					alert('Erro ao excluir o registro');
				}
			}
		});  		
	}
}

