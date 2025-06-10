
$(document).ready(function () {
	$('.data').mask("00/00/0000");
	$('.valor').mask("#.##0,00", {reverse: true});
});

$("#formulario").validate(
	{
		rules:{
			idPessoa:{
				required:true
			},
			dataInicio:{
				required:true
			},
			idPlano:{
				required:true
			}						
		}, 
		messages:{
			idPessoa:{
				required:"Campo obrigatório",
				remote:"Pessoa com contrato ativo."
			},
			dataInicio:{
				required:"Campo obrigatório"
			},
			idPlano:{
				required:"Campo obrigatório"
			}					   
		}
	}
);

function cancelarPagamento(codigo, idContrato) {
	var resposta = confirm('Confirma o cancelamento da mensalidade?');

	if (resposta) {		
		//realiza uma requisição remota (assíncrona) 
		$.ajax({
			url  : 'mensalidadeCancelar.php',
			type : 'post',
			data : {
				id : codigo
			}
		})
		.done(function(resultado){
			if(resultado == 1){
				alert('Mensalidade cancelada com sucesso!');
				window.location.replace('contratoFormulario.php?id='+idContrato);	
			}else{
				alert('Erro ao cancelar a mensalidade');
			}
		});  		
	}
}



function confirmarPagamento(codigo, idContrato) {
	var resposta = confirm('Confirma o pagamento da mensalidade?');

	if (resposta) {		
		//realiza uma requisição remota (assíncrona) 
		$.ajax({
			url  : 'mensalidadeConfirmar.php',
			type : 'post',
			data : {
				id : codigo
			}
		})
		.done(function(resultado){
			if(resultado == 1){
				alert('Mensalidade quitada com sucesso!');
				window.location.replace('contratoFormulario.php?id='+idContrato);	
			}else{
				alert('Erro ao quitar a mensalidade');
			}
		});  		
	}
}