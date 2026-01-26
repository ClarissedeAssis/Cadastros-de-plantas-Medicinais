package br.cefet.trabalho.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.cefet.trabalho.model.Categoria;
import br.cefet.trabalho.model.CategoriaPlanta;
import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.service.CategoriaPlantaService;
import br.cefet.trabalho.service.PlantaService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/categoria-planta")
@CrossOrigin(origins = "*")
public class CategoriaPlantaController {

    private final CategoriaPlantaService categoriaPlantaService;
    private final PlantaService plantaService;

    public CategoriaPlantaController(CategoriaPlantaService categoriaPlantaService, PlantaService plantaService) {
        this.categoriaPlantaService = categoriaPlantaService;
        this.plantaService = plantaService;
    }

    @GetMapping("/plantas")
    public ResponseEntity<List<Planta>> getAllPlantas() {
        return ResponseEntity.ok(plantaService.consultar());
    }

    @PostMapping("/associar")
    public ResponseEntity<String> associarPlantas(@RequestBody CategoriaPlanta categoriaPlanta) {
        try {
            categoriaPlantaService.associarPlantas(categoriaPlanta);
            return ResponseEntity.ok("Plantas associadas com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();  // Imprime o erro no log para análise
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao associar plantas!");
        }
    }
    
    @GetMapping("/plantas-por-categoria/{idCategoria}/ids")
    public ResponseEntity<List<Integer>> getPlantasIdsPorCategoria(@PathVariable int idCategoria) {
        return ResponseEntity.ok(categoriaPlantaService.consultarPlantasPorCategoria(idCategoria));
    }

    @GetMapping("/categorias-por-planta/{idPlanta}")
    public ResponseEntity<List<Categoria>> getCategoriasPorPlanta(@PathVariable int idPlanta) {
        List<Categoria> categorias = categoriaPlantaService.getCategoriasPorPlanta(idPlanta);
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable int id) {
        try {
            Categoria categoria = categoriaPlantaService.findById(id);
            if (categoria != null) {
                return ResponseEntity.ok(categoria);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/plantas-por-categoria/{idCategoria}")
    public ResponseEntity<List<Integer>> getPlantasPorCategoria(@PathVariable int idCategoria) {
        return ResponseEntity.ok(categoriaPlantaService.consultarPlantasPorCategoria(idCategoria));
    }
    
   

    @DeleteMapping("/remover/{idCategoria}/{idPlanta}")
    public ResponseEntity<String> removerPlanta(@PathVariable int idCategoria, @PathVariable int idPlanta) {
        categoriaPlantaService.removerAssociacao(idCategoria, idPlanta);
        return ResponseEntity.ok("Planta removida com sucesso!");
    }
    
    @GetMapping("/plantas-by-ids/{ids}")
    public ResponseEntity<List<Planta>> getPlantasByIds(@PathVariable String ids) {
        List<Integer> idList = Arrays.stream(ids.split(","))
                                     .map(Integer::parseInt)
                                     .collect(Collectors.toList());
        List<Planta> plantas = plantaService.getPlantasByIds(idList);
        return ResponseEntity.ok(plantas);
    }


    
}
