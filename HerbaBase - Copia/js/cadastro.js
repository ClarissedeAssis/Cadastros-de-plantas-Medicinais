
$("#formulario").validate(
	{
		rules:{
			usuario:{
				required:true,
				remote: {
					url: "usuarioVerificar.php",
					type: "post",
					data: {
						idUsuario: function() {
							return $("#idUsuario").val();
					  	}
					}
				}		     
			},
			senha:{
				required:true	   
			}											
		}, 
		messages:{
			usuario:{
				required:"Campo obrigatório",
				remote: "O usuário informado já existe"
			},			
			senha:{
				required:"Campo obrigatório"
			}			   
		}
	}
);