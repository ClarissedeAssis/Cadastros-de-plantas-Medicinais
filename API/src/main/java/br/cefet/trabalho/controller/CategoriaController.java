package br.cefet.trabalho.controller;

import br.cefet.trabalho.model.Categoria;
import br.cefet.trabalho.model.Usuario;
import br.cefet.trabalho.service.CategoriaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("/api/v1/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> criarCategoria(@RequestBody Categoria categoria) {
        Categoria novaCategoria = categoriaService.salvarCategoria(categoria);
        return ResponseEntity.ok(novaCategoria);
    }



    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Categoria>> getCategoriasByUsuario(@PathVariable int idUsuario) {
        if (idUsuario <= 0) {
            return ResponseEntity.badRequest().build();
        }

        try {
            List<Categoria> categorias = categoriaService.listarCategorias(idUsuario);
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}