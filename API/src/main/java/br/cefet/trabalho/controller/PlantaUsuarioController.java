package br.cefet.trabalho.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cefet.trabalho.model.PlantaUsuario;
import br.cefet.trabalho.service.PlantaUsuarioService;
import jakarta.validation.Path;

import org.springframework.http.MediaType; // Correção da importação

@RestController
@RequestMapping("/api/v1/plantaUsuario")
@CrossOrigin(origins = "http://localhost:8100")
public class PlantaUsuarioController {
    
    private final PlantaUsuarioService plantaUsuarioService;

    public PlantaUsuarioController(PlantaUsuarioService plantaUsuarioService) {
        this.plantaUsuarioService = plantaUsuarioService;
    }
    
    @GetMapping("/planta/{idPlanta}")
    public List<PlantaUsuario> consultarComentariosPorPlanta(@PathVariable int idPlanta) {
        return plantaUsuarioService.consultarComentariosPorPlanta(idPlanta);
    }

    @GetMapping({"/", ""})
    public List<PlantaUsuario> consultarTodos() {
        return plantaUsuarioService.consultarComentarios();
    }

    @PostMapping({"/", ""})
    public ResponseEntity<PlantaUsuario> inserir(@RequestBody PlantaUsuario c) {
        PlantaUsuario novoComentario = plantaUsuarioService.inserir(c);
        return ResponseEntity.ok(novoComentario);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") int id) {
        try {
            plantaUsuarioService.excluir(id);  // Chama o serviço para excluir o comentário
            return ResponseEntity.noContent().build();  // Retorna 204 No Content se a exclusão for bem-sucedida
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Retorna 404 se o comentário não for encontrado
        }
    }
    
    @GetMapping("/{id}")
    public PlantaUsuario consultarPlantaUsuario(@PathVariable("id") int id) {
        return plantaUsuarioService.consultarPorId(id);
    }
    
    @GetMapping("/uploads/fotos/{arquivoFotoUsuario}")
    public ResponseEntity<Resource> getFoto(@PathVariable String arquivoFotoUsuario) {
        java.nio.file.Path path = Paths.get("C:/Users/Usuario/package/uploads/fotos/" + arquivoFotoUsuario);
        Resource resource = new FileSystemResource(path);

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        try {
            String contentType = Files.probeContentType(path);
            MediaType mediaType = contentType != null ? MediaType.parseMediaType(contentType) : MediaType.APPLICATION_OCTET_STREAM;

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
