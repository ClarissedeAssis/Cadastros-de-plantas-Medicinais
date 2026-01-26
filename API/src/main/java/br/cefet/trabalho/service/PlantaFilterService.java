package br.cefet.trabalho.service;

import java.util.List;

import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.model.PlantaFilter;
import io.micrometer.common.util.StringUtils;
import br.cefet.trabalho.dao.PlantaDao;

import org.jdbi.v3.core.Jdbi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlantaFilterService {

	private final PlantaDao plantaDao;
    
    public PlantaFilterService(Jdbi jdbi) {
        this.plantaDao = jdbi.onDemand(PlantaDao.class);
    }
	 
	 
    public List<Planta> getByFilter(PlantaFilter plantaFilter) {
        if (plantaFilter != null) {
            if (StringUtils.isBlank(plantaFilter.getNomePopular())) {
                plantaFilter.setNomePopular(null);
            } else {
                plantaFilter.setNomePopular("%" + plantaFilter.getNomePopular() + "%");
            }
            if (StringUtils.isBlank(plantaFilter.getNomeCientifico())) {
                plantaFilter.setNomeCientifico(null);
            } else {
                plantaFilter.setNomeCientifico("%" + plantaFilter.getNomeCientifico() + "%");
            }

            if (StringUtils.isBlank(plantaFilter.getOrigem())) {
                plantaFilter.setOrigem(null);
            } else {
                plantaFilter.setOrigem("%" + plantaFilter.getOrigem() + "%");
            }

            if (StringUtils.isBlank(plantaFilter.getAplicacoesMedicinais())) {
                plantaFilter.setAplicacoesMedicinais(null);
            } else {
                plantaFilter.setAplicacoesMedicinais("%" + plantaFilter.getAplicacoesMedicinais() + "%");
            }
        } else {
            plantaFilter = new PlantaFilter();
        }

        return plantaDao.getByFilter(
                plantaFilter.getNomePopular(),
                plantaFilter.getNomeCientifico(),
                plantaFilter.getOrigem(),
                plantaFilter.getAplicacoesMedicinais()
        );
    }
}
