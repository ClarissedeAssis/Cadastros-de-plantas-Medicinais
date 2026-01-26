package br.cefet.trabalho.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import br.cefet.trabalho.model.Usuario;

@RegisterBeanMapper(Usuario.class)
public interface UsuarioDao {

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO usuario (nome, email, senha, arquivoFotoUsuario) "
            + "VALUES (:nome, :email, :senha, :arquivoFotoUsuario);")
    public int inserir(@BindBean Usuario u);

    @SqlQuery("SELECT * FROM usuario;")
    public List<Usuario> consultar();
    
    @SqlQuery("SELECT * FROM usuario WHERE id = :id;")
    public Usuario consultarPorId(@Bind int id);
    
    @SqlUpdate("UPDATE usuario "
            + "SET nome = :nome, "
            + "    email = :email, "
            + "    senha = :senha, "
            + "    arquivoFotoUsuario = :arquivoFotoUsuario "
            + "WHERE id = :id;")
    public int alterar(@BindBean Usuario u);
    
    @SqlUpdate("DELETE FROM usuario WHERE id = :id;")
    public int excluir(@Bind int id);
    
    @SqlQuery("SELECT * FROM usuario "
            + "WHERE email = :email AND senha = :senha")
    Usuario consultarPorEmailESenha(@Bind("email") String email, @Bind("senha") String senha);
    
    @SqlQuery("SELECT * FROM usuario WHERE email = :email")
    Usuario consultarPorEmail(@Bind("email") String email);
    
    @SqlUpdate("UPDATE usuario SET autenticado = true WHERE id = :id")
    public void registrarAutenticacao(@Bind int id);

    @SqlQuery("SELECT * FROM usuario WHERE autenticado = true LIMIT 1")
    public Usuario recuperarAutenticacao();

    @SqlUpdate("UPDATE usuario SET autenticado = false WHERE id = :id")
    public void encerrarAutenticacao(@Bind int id);
}
