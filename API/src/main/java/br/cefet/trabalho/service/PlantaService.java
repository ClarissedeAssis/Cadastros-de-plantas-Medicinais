package br.cefet.trabalho.service;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.cefet.trabalho.dao.PlantaDao;
import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.model.PlantaFilter;

@Service
public class PlantaService {
	
	 private final PlantaDao plantaDao;
	    
	    public PlantaService(Jdbi jdbi) {
	        this.plantaDao = jdbi.onDemand(PlantaDao.class);
	    }
	    
	    public Planta inserir(Planta p) {
	        if (p.getId() != 0) {
	            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Id - informação ilegal.");
	        }

	        int id = plantaDao.inserir(p);
	        p.setId(id);
	        return p;
	    }
	    
	    public List<Planta> consultar() {
	        return plantaDao.consultar();
	    }
	    

	    public List<Planta> getPlantasByIds(List<Integer> ids) {
	        return plantaDao.findByIds(ids);
	    }
	    public Planta consultarPorId(int id) {
	        return plantaDao.consultarPorId(id);
	    }
	    
	    public List<Planta> buscarPlantasPorIds(List<Integer> ids) {
	        return plantaDao.buscarPlantasPorIds(ids);
	    }
	    
	    public Planta alterar(Planta p) {
	        //Validacoes extras das informacoes
	        int id = p.getId();
	        if (id == 0) {
	            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "Id é uma informação obrigatória.");
	        }
	        
	        Planta uAux = plantaDao.consultarPorId(id);
	        if (uAux == null){
	            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Planta não encontrada com o id: " +id+ ".");
	        }
	        
	        //Alteracao da entidade
	        int qtd = plantaDao.alterar(p);
	        
	        //Validar se a entidade foi alterada corretamente.
	        if (qtd != 1){
	            throw new ResponseStatusException(HttpStatus.CONFLICT, "A quantidade de entidades alteradas é " +qtd+ ".");
	        }
	        
	        //Retornar a informacao alterada no banco de dados.
	        uAux = plantaDao.consultarPorId(id);
	        return uAux;
	    }

	    public Planta excluir(int id) {
	        //Validacoes extras das informacoes
	        Planta uAux = plantaDao.consultarPorId(id);
	        if (uAux == null){
	            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Planta não encontrada com o id: " +id+ ".");
	        }
	        
	        //Alteracao da entidade
	        int qtd = plantaDao.excluir(id);
	        
	        //Validar se a entidade foi alterada corretamente.
	        if (qtd != 1){
	            throw new ResponseStatusException(HttpStatus.CONFLICT, "A quantidade de entidades alteradas é " +qtd+ ".");
	        }
	        
	        return uAux;
	    }

		public Object getByFilter(PlantaFilter plantaFilter) {
			// TODO Auto-generated method stub
			return null;
		}
	    
	    
}
