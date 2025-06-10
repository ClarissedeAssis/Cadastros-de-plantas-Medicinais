$("#formulario").validate(
	{
		rules:{
			descricao:{
				required:true,
				remote: {
					url: "exercicioVerificarDescricao.php",
					type: "post",
					data: {
						id: function() {
							return $("#id").val();
					  	}
					}
				}		   
			},
			idTipoExercicio:{
				required:true	
			}				
		}, 
		messages:{
			descricao:{
				required:"Campo obrigatório",
				remote:"O exercicio já existe"
			},
			idTipoExercicio:{
				required:"Campo obrigatório"
			}					   
		}
	}
);