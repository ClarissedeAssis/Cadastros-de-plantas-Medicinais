<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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

        #finalizar-button {
            border: 2px solid green;
            padding: 10px;
            border-radius: 15px;
        }

        #finalizar-button:hover {
            background-color: green;
            color: white;
        }

        h1 {
            font-weight: 200;
        }

        main {
            display: flex;
            flex-direction: row;
            margin-top: 50px;
        }

        h2 {
            font-size: 56px;
            line-height: 10px;
        }

        span {
            color: green;
        }

        p {
            line-height: 20px;
            max-width: 500px;
        }

        img {
            width: 620px;
            margin-top: -100px;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 70%;
        }

        form [type="submit"] {
            height: 50px;
            width: 50%;
            background-color: green;
            color: white;
            font-weight: bold;
        }

        form [type="submit"]:hover {
            cursor: pointer;
        }

        input {
            margin-top: 20px;
            height: 20px;
            padding: 15px;
            border-radius: 20px;
            border: none; 
            font-size: 15px;
        }
    </style>
</head>
<body>
    <header>
        <div>
            <h1>HerbaBase</h1>
        </div>
    </header>

    <main>
        <aside>
            <h2><span>Faça seu</span></h2>
            <h2>Login</h2>
            <p>
                Esse é o site destinado para a base de dados do aplicativo HerbaBase
            </p>
            <form action="salvarLogin.php" method="post" enctype="multipart/form-data">
                <input class="form-control" id="email" name="email" type="email" placeholder="Email">
                <input class="form-control" id="senha" name="senha" type="password" placeholder="Informe a Senha">
                <input type="submit" value="Entrar">
            </form>
        </aside>

        <article>
            <img src="arquivos/logoHerbaBase.png" alt="Logo">
        </article>
    </main>
</body>
</html>
