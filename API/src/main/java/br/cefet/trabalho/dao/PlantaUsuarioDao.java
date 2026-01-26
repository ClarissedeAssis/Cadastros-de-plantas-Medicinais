package br.cefet.trabalho.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.model.PlantaUsuario;

@RegisterBeanMapper(PlantaUsuario.class)
public interface PlantaUsuarioDao {

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO PlantaUsuario (idPlanta, idUsuario, descricao, avaliacao) "
            + "VALUES (:idPlanta, :idUsuario, :descricao, :avaliacao);")
    int inserir(@BindBean PlantaUsuario c);
    
    @SqlQuery("SELECT * FROM PlantaUsuario;")
    List<PlantaUsuario> consultar();
    
    @SqlQuery("SELECT * FROM PlantaUsuario WHERE id = :id;")
    PlantaUsuario consultarPorId(@Bind int id);

    @SqlUpdate("DELETE FROM PlantaUsuario WHERE id = :id;")
    public int excluir(@Bind int id);
    
    @SqlQuery("SELECT * FROM PlantaUsuario WHERE idPlanta = :idPlanta;")
    List<PlantaUsuario> consultarComentariosPorPlanta(@Bind("idPlanta") int idPlanta);
    
    @SqlQuery("SELECT * FROM PlantaUsuario WHERE idUsuario = :idUsuario AND idPlanta = :idPlanta")
    PlantaUsuario consultarPorUsuarioEPlanta(@Bind("idUsuario") int idUsuario, @Bind("idPlanta") int idPlanta);

    @SqlUpdate("UPDATE PlantaUsuario SET avaliacao = :avaliacao WHERE id = :id")
    int atualizar(@BindBean PlantaUsuario plantaUsuario);
    
}