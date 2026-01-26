package br.cefet.trabalho.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.cefet.trabalho.dao.PlantaDao;
import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.model.PlantaFilter;
import br.cefet.trabalho.service.PlantaFilterService;
import br.cefet.trabalho.service.PlantaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/planta")
@CrossOrigin(origins = "*")
public class PlantaController {
	
	private final PlantaService plantaService;
	private final PlantaFilterService plantaFilterService;

    public PlantaController(PlantaService plantaService, PlantaFilterService plantaFilterService) {
        this.plantaService = plantaService;
        this.plantaFilterService = plantaFilterService;
    }
    
    @GetMapping({"/", ""})
    public List<Planta> consultarTodos() {
    	List<Planta> plantaList = plantaService.consultar();
    	return plantaList;
    }
    
    @GetMapping("/{id}")
    public Planta consultarPlanta(@PathVariable("id") int id) {
        Planta planta = plantaService.consultarPorId(id);
        if (planta != null && planta.getArquivoFoto() != null) {
            // Retorna a URL completa ou caminho relativo
            planta.setArquivoFoto("http://localhost:8080/uploads/fotos/" + planta.getArquivoFoto());
        }
        return planta;
    }

    
    @PostMapping({"/", ""})
    public ResponseEntity<Planta> inserir(@Valid @RequestBody Planta p) {
        return ResponseEntity.ok(plantaService.inserir(p));
    }
    
    @PutMapping({"/", ""})
    public Planta alterar(@RequestBody Planta planta) {
        plantaService.alterar(planta);
    	return planta;
    }
    
    @DeleteMapping("/{id}")
    public Planta excluir(@PathVariable("id") int id) {
        Planta planta = plantaService.consultarPorId(id);
        if(planta == null) {
        	throw new RuntimeException("Não existe planta com este id para ser excluida!");
        }
        plantaService.excluir(id);
    	return planta;
    }
    
  
    
    @RequestMapping(value = "/plantaFilter", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<Planta>> getByFilter(@RequestBody PlantaFilter plantaFilter) {
        return ResponseEntity.ok(plantaFilterService.getByFilter(plantaFilter));
    }
    
    
    
    
    
}
