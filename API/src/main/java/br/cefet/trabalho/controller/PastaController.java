package br.cefet.trabalho.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cefet.trabalho.model.Pasta;
import br.cefet.trabalho.service.PastaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/pasta")
public class PastaController {

	private final PastaService pastaService;

    public PastaController(PastaService pastaService) {
        this.pastaService = pastaService;
    }
    
    @GetMapping({"/", ""})
    public List<Pasta> consultarTodos() {
    	List<Pasta> pastaList = pastaService.consultar();
    	return pastaList;
    }
    
    @GetMapping("/{id}")
    public Pasta consultarPasta(@PathVariable("id") int id) {
        Pasta ret = pastaService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"/", ""})
    public ResponseEntity<Pasta> inserir(@Valid @RequestBody Pasta p) {
        return ResponseEntity.ok(pastaService.inserir(p));
    }
    
    @PutMapping({"/", ""})
    public Pasta alterar(@RequestBody Pasta pasta) {
        pastaService.alterar(pasta);
    	return pasta;
    }
    
    @DeleteMapping("/{id}")
    public Pasta excluir(@PathVariable("id") int id) {
        Pasta pasta = pastaService.consultarPorId(id);
        if(pasta == null) {
        	throw new RuntimeException("Não existe pasta com este id para ser excluida!");
        }
        pastaService.excluir(id);
    	return pasta;
    }
}
