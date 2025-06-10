$(document).ready(function () {
	$('#tabela').DataTable({
		language: {
			url: 'js/dataTables.pt_br.json'
		}
	});

	$('.cpf').mask('999.999.999-99');	
});

function confirmarExclusao(codigo) {
	var resposta = confirm('Confirma a exclusão do registro?');

	if (resposta) {		
		//realiza uma requisição remota (assíncrona) 
		$.ajax({
			url  : 'pessoaExcluir.php',
			type : 'post',
			data : {
				id : codigo
			}
		})
		.done(function(resultado){
			if(resultado == 1){
				alert('Registro excluído com sucesso!');
				window.location.replace('pessoaTabela.php');
			}else{
				alert('Erro ao excluir o registro');
			}
		});  		
	}
}