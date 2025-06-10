<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
    <style>
        body {
            background-color: rgb(34, 34, 34);
            color: white;
            max-width: 1200px;
            margin: 0 auto;
            padding: 15px;
        }

        header {
            display: flex; /* facilita posicionar os elementos */
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #title {
            flex-direction: column;
            line-height: 10px;
        }

        li {
            display: inline-block; /* faz todos os elementos ficarem na mesma linha */
            margin: 20px;
        }

        a {
            color: white;
        }

        a:hover {
            color: green;
            transition: 0.3s all;
        }

        #finalizar-button {
            border: 2px solid green;
            padding: 10px;
            border-radius: 15px;
        }

        #finalizar-button:hover {
            background-color: green;
            color: white;
        }

        h1{
	        font-weight: 200;
        }
    </style>
</head>
<body>
    <header>
        <div>
            <h1>HerbaBase</h1>
        </div>
        <ul>
            <a href="tabela.php"><li>Plantas</li></a>
            <a href="cadastro.php"><li>Cadastrar Admin</li></a>
            <a href="dados.php"><li>Dados</li></a>
            <a id="finalizar-button" href="finalizarSessao.php"><li>Finalizar sessão</li></a>
        </ul>
    </header>
</body>
</html>
