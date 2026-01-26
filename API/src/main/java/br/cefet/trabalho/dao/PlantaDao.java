package br.cefet.trabalho.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.AllowUnusedBindings;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.customizer.DefineNamedBindings;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateEngine;

import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.model.PlantaFilter;

@RegisterBeanMapper(Planta.class)

public interface PlantaDao {
	
	@GetGeneratedKeys
	@SqlUpdate(" insert into planta (nomePopular, nomeCientifico, origem, aplicacoesMedicinais, arquivoFotoPlanta, avaliacaoGeral) "
			+ " values (:nomePopular, :nomeCientifico, :origem, :aplicacoesMedicinais, :arquivoFotoPlanta, :avaliacaoGeral);")
	public int inserir(@BindBean Planta p);

	@SqlQuery(" select * from planta;")
	public List<Planta> consultar();
	
	@SqlQuery("SELECT * FROM planta WHERE id IN (<ids>)")
	List<Planta> findByIds(@BindList("ids") List<Integer> ids);

	@SqlQuery("SELECT * FROM planta WHERE id IN (<ids>)")
	@RegisterBeanMapper(Planta.class)
	List<Planta> buscarPlantasPorIds(@BindList("ids") List<Integer> ids);
	
	@SqlQuery(" select * from planta "
			+ " where id = :id;")
	public Planta consultarPorId(@Bind int id);
	
	@SqlUpdate(" update planta "
	        + " set nomePopular = :nomePopular, "
	        + "     nomeCientifico = :nomeCientifico, "
	        + "     origem = :origem, "
	        + "     aplicacoesMedicinais = :aplicacoesMedicinais, "
	        + "     arquivoFotoPlanta = :arquivoFotoPlanta, "
	        + "     avaliacaoGeral = :avaliacaoGeral"
	        + " where id = :id;")
	public int alterar(@BindBean Planta p);
	
	@SqlUpdate(" delete from planta "
			+ " where id = :id;")
	public int excluir(@Bind int id);
	
    @SqlUpdate("UPDATE planta SET avaliacaoGeral = :avaliacaoGeral WHERE id = :id")
    void atualizarAvaliacaoGeral(@Bind("id") Long id, @Bind("avaliacaoGeral") Double avaliacaoGeral);
	
	
	
	@AllowUnusedBindings
	@DefineNamedBindings
	@UseStringTemplateEngine
	@SqlQuery("SELECT * FROM planta WHERE 1=1" +
	          " <if(nomePopular)> AND nomePopular like :nomePopular <endif>" +
	          " <if(nomeCientifico)> AND nomeCientifico like :nomeCientifico <endif>" +
	          " <if(origem)> AND origem like :origem <endif>" +
	          " <if(aplicacoesMedicinais)> AND aplicacoesMedicinais like :aplicacoesMedicinais <endif>" +
	          " <if(avaliacao)> AND avaliacaoGeral >= :avaliacaoGeral <endif>")
	public List<Planta> getByFilter(@Bind("nomePopular") String nomePopular, 
            @Bind("nomeCientifico") String nomeCientifico, 
            @Bind("origem") String origem, 
            @Bind("aplicacoesMedicinais") String aplicacoesMedicinais);
}