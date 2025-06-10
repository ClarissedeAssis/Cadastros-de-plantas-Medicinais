/*
$(document).ready(function(){
	$('#dataNascimento').mask('99/99/9999');
});

$("#formulario").submit(function() {
	$("#dataNascimento").unmask();
});
*/

$("#formulario").validate(
	{
		rules:{
			nome:{
				required:true,
				remote: {
					url: "tipoExercicioVerificarNome.php",
					type: "post",
					data: {
						id: function() {
							return $("#id").val();
					  	}
					}
				}		   
			}				
		}, 
		messages:{
			nome:{
				required:"Campo obrigatório",
				remote:"O tipo de exercicio já existe"
			}					   
		}
	}
);