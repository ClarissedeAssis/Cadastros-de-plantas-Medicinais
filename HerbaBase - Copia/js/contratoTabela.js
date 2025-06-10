$(document).ready(function () {
	$('#tabela').DataTable({
		language: {
			url: 'js/dataTables.pt_br.json'
		}
	});

	$('.cpf').mask('999.999.999-99');	
	$('.data').mask("00/00/0000");
});



