$(document).ready(function(){
	$('#cpf').mask('999.999.999-99');
});

$("#formulario").submit(function() {
	if ($('#formulario').valid()){
		$("#cpf").unmask();
	}
});

$("#formulario").validate(
	{
		rules:{
			nome:{
				required:true
			},
			cpf:{
				required:true,
				remote: {
					url: "pessoaVerificarCPF.php",
					type: "post",
					data: {
						id: function() {
							return $("#id").val();
					  	}
					}
				}		   
			},
			email:{
				required:true,
				email: true,
				remote: {
					url: "pessoaVerificarEmail.php",
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
				required:"Campo obrigatório"
			},
			cpf:{
				required:"Campo obrigatório",
				remote:"O CPf informado já existe"
			},
			email:{
				required:"Campo obrigatório",
				remote:"O e-mail informado já existe"
			}					   
		}
	}
);