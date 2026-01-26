package br.cefet.trabalho.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import br.cefet.trabalho.model.Pasta;

@RegisterBeanMapper(Pasta.class)
public interface PastaDao {

    @GetGeneratedKeys
    @SqlUpdate(" insert into pasta (nome) "
             + " values (:nome);")
    int inserir(@BindBean Pasta p);

    @SqlQuery(" select * from pasta;")
    List<Pasta> consultar();
    
    @SqlQuery(" select * from pasta "
            + " where id = :id;")
    Pasta consultarPorId(@Bind int id);
    
    @SqlUpdate(" update pasta "
            + "  set nome = :nome "
            + " where id = :id;")
    int alterar(@BindBean Pasta p);
    
    @SqlUpdate(" delete from pasta "
             + " where id = :id;")
    int excluir(@Bind int id);
}
