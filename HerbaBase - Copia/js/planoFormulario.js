$(document).ready(function(){
	$('#valor').mask("#.##0,00", {reverse: true});
	$('#parcelas').mask("#0");
});

$("#formulario").submit(function() {
	$('#valor').mask("###0.00", {reverse: true});
});

$("#formulario").validate(
	{
		rules:{
			descricao:{
				required:true
			},
			parcelas:{
				required:true,
				min: 1
			},
			valor:{
				required:true
			}				
		}, 
		messages:{
			descricao:{
				required:"Campo obrigatório",
			},
			parcelas:{
				required:"Campo obrigatório",
				min:"A quantidade deve ser maior que zero",
			},
			valor:{
				required:"Campo obrigatório",
			}											   
		}
	}
);