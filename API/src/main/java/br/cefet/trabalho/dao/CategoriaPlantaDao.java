package br.cefet.trabalho.dao;

import br.cefet.trabalho.model.Categoria;
import br.cefet.trabalho.model.CategoriaPlanta;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;

import java.util.List;

@RegisterBeanMapper(CategoriaPlanta.class)
public interface CategoriaPlantaDao {

	@SqlQuery("SELECT COUNT(*) FROM categoriaPlanta WHERE idCategoria = :idCategoria AND idPlanta = :idPlanta")
	int verificarAssociacaoExistente(@Bind("idCategoria") int idCategoria, @Bind("idPlanta") int idPlanta);

    @SqlBatch("INSERT INTO categoriaPlanta (idCategoria, idPlanta) VALUES (:idCategoria, :idPlanta)")
    void associarPlantas(@Bind("idCategoria") int idCategoria, @Bind("idPlanta") List<Integer> idPlantas);

    @SqlQuery("SELECT idPlanta FROM categoriaPlanta WHERE idCategoria = :idCategoria")
    List<Integer> consultarPlantasPorCategoria(@Bind("idCategoria") int idCategoria);
    
    
    @SqlQuery("SELECT c.* FROM categoriaPlanta cp JOIN categoria c ON cp.idCategoria = c.id WHERE cp.idPlanta = :idPlanta")
    @RegisterBeanMapper(Categoria.class)
    List<Categoria> findCategoriasByPlantaId(@Bind("idPlanta") int idPlanta);
    @SqlQuery("SELECT * FROM categoria WHERE id = :id")
    @RegisterBeanMapper(Categoria.class)
    Categoria findById(@Bind("id") int id);

    @SqlUpdate("DELETE FROM categoriaPlanta WHERE idCategoria = :idCategoria AND idPlanta = :idPlanta")
    void removerAssociacao(@Bind("idCategoria") int idCategoria, @Bind("idPlanta") int idPlanta);
}
