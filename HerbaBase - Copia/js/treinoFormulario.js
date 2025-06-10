$(document).ready(function () {
	$('.data').mask("00/00/0000");
	$('#quantidade').mask("##0");
});

$("#formularioTreino").validate(
	{
		rules:{
			idPessoa:{
				required:true,
				remote: {
					url: "treinoVerificarPessoa.php",
					type: "post"
				}		   
			},
			dataInicio:{
				required:true
			},
			dataTermino:{
				required:true
			}					
		}, 
		messages:{
			idPessoa:{
				required:"Campo obrigatório",
				remote:"Pessoa com treino em aberto."
			},
			dataInicio:{
				required:"Campo obrigatório"
			},
			dataTermino:{
				required:"Campo obrigatório"
			}				   
		}
	}
);

$("#formularioTreinoExercicio").validate(
	{
		rules:{
			idExercicio:{
				required:true
			},
			quantidade:{
				required:true
			}				
		}, 
		messages:{
			idExercicio:{
				required:"Campo obrigatório"
			},
			quantidade:{
				required:"Campo obrigatório"
			}			   
		}
	}
);


function confirmarExclusao(idTreinoExercicio, idTreino) {

	var resposta = confirm('Confirma a exclusão do registro?');

	if (resposta) {		
		//realiza uma requisição remota (assíncrona) 
		$.ajax({
			url  : 'treinoExercicioExcluir.php',
			type : 'post',
			data : {
				idTreinoExercicio : idTreinoExercicio
			}
		})
		.done(function(resultado){
			if(resultado == 1){
				alert('Registro excluído com sucesso!');
				window.location.replace('treinoFormulario.php?idTreino='+idTreino);	
			}else{
				alert('Erro ao excluir o registro');
			}
		});  		
	}
}

