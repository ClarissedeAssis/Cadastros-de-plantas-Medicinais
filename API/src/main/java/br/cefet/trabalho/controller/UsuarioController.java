package br.cefet.trabalho.controller;

import java.io.IOException;
import java.net.http.HttpHeaders;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.cefet.trabalho.model.Usuario;
import br.cefet.trabalho.service.UsuarioService;


import jakarta.validation.Valid;



import org.springframework.core.io.Resource;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/usuario")
@CrossOrigin(origins = "http://localhost:8100")
public class UsuarioController {
	
private final UsuarioService usuarioService;
    
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    @GetMapping({"/", ""})
    public List<Usuario> consultarTodos() {
    	List<Usuario> usuarioList = usuarioService.consultar();
    	return usuarioList;
    }
    
    @GetMapping("/{id}")
    public Usuario consultarUsuario(@PathVariable("id") int id) {
        Usuario ret = usuarioService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"/", ""})
    public ResponseEntity<Usuario> inserir(@Valid @RequestBody Usuario u) {
        return ResponseEntity.ok(usuarioService.inserir(u));
    }
    
    @PutMapping({"/", ""})
    public ResponseEntity<Usuario> alterar(@RequestBody Usuario usuario) {
        if (usuario.getId() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido para alteração.");
        }
        Usuario usuarioAlterado = usuarioService.alterar(usuario);
        return ResponseEntity.ok(usuarioAlterado);
    }
    
    @DeleteMapping("/{id}")
    public Usuario excluir(@PathVariable("id") int id) {
        Usuario usuario = usuarioService.consultarPorId(id);
        if(usuario == null) {
        	throw new RuntimeException("Não existe usuário com este id para ser excluido!");
        }
        usuarioService.excluir(id);
    	return usuario;
    }	
	
    @GetMapping("/autenticar/{email}/{senha}")
    public ResponseEntity<Usuario> autenticar(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Usuario usuario = usuarioService.autenticar(email, senha);
        
        if (usuario == null) {
            // Retorna um status 200 OK com um corpo vazio, sem parar o sistema
            return ResponseEntity.ok(null);
        }
        
        return ResponseEntity.ok(usuario);
    }
    
    
    @GetMapping("/verificarLogin")
    public Usuario verificarLogin(@RequestParam("email") String email) {
        Usuario usuario = usuarioService.verificarLogin(email);
        if (usuario == null) {
        	 return usuario;
        }
        return usuario;
    }
    
    @GetMapping("/recuperarAutenticacao")
    public ResponseEntity<Usuario> recuperarAutenticacao() {
        Usuario usuario = usuarioService.recuperarAutenticacao();
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/desautenticar")
    public ResponseEntity<Void> encerrarAutenticacao() {
        usuarioService.encerrarAutenticacao();
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/registrarAutenticacao")
    public ResponseEntity<Void> registrarAutenticacao(@RequestBody Usuario usuario) {
        usuarioService.registrarAutenticacao(usuario);
        return ResponseEntity.noContent().build();
    }
    
    
 


    @PostMapping("/foto")
    public ResponseEntity<Usuario> uploadFoto(@RequestParam("arquivo") MultipartFile arquivo,
                                              @RequestParam("id") int id) {
        try {
            // Verifica se o usuário existe
            Usuario usuario = usuarioService.consultarPorId(id);
            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }if (arquivo == null || arquivo.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Arquivo vazio ou não enviado.");
            }

            // Cria diretório se não existir
            String diretorio = "C:\\Users\\Usuario\\package\\uploads\\fotos\\";

            Files.createDirectories(Paths.get(diretorio));

            // Gera nome único para o arquivo
            String nomeArquivo = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();

            // Caminho absoluto
            Path caminho = Paths.get(diretorio + nomeArquivo);

            // Salva o arquivo
            arquivo.transferTo(caminho.toFile());

            // Atualiza o usuário com o caminho relativo
            usuario.setArquivoFotoUsuario("uploads/fotos/" + nomeArquivo); // caminho relativo para usar no frontend
            Usuario usuarioAtualizado = usuarioService.alterar(usuario);

            return ResponseEntity.ok(usuarioAtualizado);
        } catch (IOException e) {
            e.printStackTrace(); // Adiciona essa linha para ver o erro completo no console
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao salvar a foto.", e);
        }

    }

    @GetMapping("/foto/{nomeArquivo}")
    public ResponseEntity<Resource> servirFoto(@PathVariable String nomeArquivo) {
        try {
            Path caminho = Paths.get("uploads/fotos/").resolve(nomeArquivo).normalize();
            Resource recurso = new UrlResource(caminho.toUri());

            if (!recurso.exists() || !recurso.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Arquivo não encontrado");
            }

            // Descobre o tipo MIME (image/jpeg, image/png, etc.)
            String contentType = Files.probeContentType(caminho);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity
                    .ok()
                    .header("Content-Type", contentType)
                    .body(recurso);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao servir a imagem.", e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> alterar(@PathVariable int id, @RequestBody Usuario usuario) {
        if (id <= 0 || id != usuario.getId()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido para alteração.");
        }
        Usuario usuarioAlterado = usuarioService.alterar(usuario);
        return ResponseEntity.ok(usuarioAlterado);
    }

    
    @PutMapping("/foto/{id}")
    public ResponseEntity<Usuario> atualizarFoto(@PathVariable("id") int id, 
                                                 @RequestParam("arquivo") MultipartFile arquivo) {
        try {
            System.out.println("Recebendo foto para o usuário com ID: " + id);
            if (arquivo != null) {
                System.out.println("Arquivo recebido: " + arquivo.getOriginalFilename());
            } else {
                System.out.println("Nenhum arquivo foi enviado.");
            }
            // Verifica se o usuário existe
            Usuario usuario = usuarioService.consultarPorId(id);
            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            if (arquivo == null || arquivo.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Arquivo vazio ou não enviado.");
            }

            // Cria diretório se não existir
            String diretorio = "C:\\Users\\Usuario\\package\\uploads\\fotos\\";

            Files.createDirectories(Paths.get(diretorio));

            // Gera nome único para o arquivo
            String nomeArquivo = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();

            // Caminho absoluto
            Path caminho = Paths.get(diretorio + nomeArquivo);

            // Salva o arquivo
            arquivo.transferTo(caminho.toFile());

            // Atualiza o usuário com o caminho relativo da foto
            usuario.setArquivoFotoUsuario("uploads/fotos/" + nomeArquivo); // caminho relativo para o frontend
            Usuario usuarioAtualizado = usuarioService.alterar(usuario);

            return ResponseEntity.ok(usuarioAtualizado);
        } catch (IOException e) {
            e.printStackTrace(); // Adiciona essa linha para ver o erro completo no console
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao salvar a foto.", e);
        }
    }


}
