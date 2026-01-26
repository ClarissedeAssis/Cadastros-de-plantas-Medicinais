package br.cefet.trabalho.service;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.cefet.trabalho.dao.UsuarioDao;
import br.cefet.trabalho.model.Usuario;

@Service
public class UsuarioService {

    private final UsuarioDao usuarioDao;
    
    private Usuario usuarioAutenticado;

    public UsuarioService(Jdbi jdbi) {
        this.usuarioDao = jdbi.onDemand(UsuarioDao.class);
    }

    public Usuario inserir(Usuario u) {
        if (u.getId() != 0) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Id - informação ilegal.");
        }

        int id = usuarioDao.inserir(u);
        u.setId(id);
        return u;
    }

    // ok
    public List<Usuario> consultar() {
        return usuarioDao.consultar();
    }

    // ok
    public Usuario consultarPorId(int id) {
        return usuarioDao.consultarPorId(id);
    }

    public Usuario alterar(Usuario u) {
        int id = u.getId();

        if (id <= 0) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED,
                    "Id é informação obrigatória e deve ser maior que zero.");
        }

        Usuario uAux = usuarioDao.consultarPorId(id);
        if (uAux == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com o id: " + id + ".");
        }

        int qtd = usuarioDao.alterar(u);
        if (qtd != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A quantidade de entidades alteradas é " + qtd + ".");
        }

        uAux = usuarioDao.consultarPorId(id);
        return uAux;
    }

    public Usuario excluir(int id) {
        Usuario uAux = usuarioDao.consultarPorId(id);
        if (uAux == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com o id: " + id + ".");
        }

        int qtd = usuarioDao.excluir(id);

        if (qtd != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A quantidade de entidades alteradas é " + qtd + ".");
        }

        return uAux;
    }

    public Usuario autenticar(String email, String senha) {
        Usuario usuario = usuarioDao.consultarPorEmailESenha(email, senha);

        

        return usuario;
    }

    public Usuario verificarLogin(String email) {
        Usuario usuario = usuarioDao.consultarPorEmail(email);

        if (usuario == null) {
        	return usuario;
        }

        return usuario;
    }

    public void registrarAutenticacao(Usuario usuario) {
        if (usuario == null) {
        	this.usuarioAutenticado = usuario;
        }
        this.usuarioAutenticado = usuario;
    }
    
   

    public Usuario recuperarAutenticacao() {
        if (this.usuarioAutenticado == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nenhum usuário autenticado.");
        }

        return this.usuarioAutenticado;
    }

    public void encerrarAutenticacao() {
        this.usuarioAutenticado = null;
    }
    
    
  
    }


