<?php
	session_start();
	session_destroy();

	echo "<script>alert('Sessão excluída com sucesso!!!');</script>"; 
	echo "<script>location.href='login.php';</script>"; 	
?>