$("#formulario").validate(
	{
		rules:{
			login:{
				required:true
			},
			senha:{
				required:true	
			}					
		}, 
		messages:{
			login:{
				required:"Campo obrigatório"
			},
			senha:{
				required:"Campo obrigatório"
			}							   
		}
	}
);
