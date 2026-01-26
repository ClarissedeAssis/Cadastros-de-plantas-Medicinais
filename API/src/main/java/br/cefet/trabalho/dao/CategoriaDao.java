package br.cefet.trabalho.dao;

import br.cefet.trabalho.model.Categoria;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RegisterBeanMapper(Categoria.class) // Mapeamento do bean Categoria
public interface CategoriaDao {

	@SqlUpdate("INSERT INTO categoria (descricao, idUsuario) VALUES (:descricao, :idUsuario)")
    @GetGeneratedKeys
    int insert(@BindBean Categoria categoria);

    @SqlQuery("SELECT * FROM categoria WHERE idUsuario = :idUsuario")
    @RegisterBeanMapper(Categoria.class)
    List<Categoria> findByUserId(@Bind("idUsuario") int idUsuario);


    @SqlUpdate("UPDATE categoria SET descricao = :descricao WHERE id = :id")
    int alterar(@BindBean Categoria categoria);

    @SqlUpdate("DELETE FROM categoria WHERE id = :id")
    int excluir(@Bind("id") int id);
}