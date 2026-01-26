package br.cefet.trabalho.service;

import br.cefet.trabalho.dao.CategoriaDao;
import br.cefet.trabalho.dao.UsuarioDao;
import br.cefet.trabalho.model.Categoria;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
@Service
public class CategoriaService {

    private final CategoriaDao categoriaDao;
    private final UsuarioDao usuarioDao;

    public CategoriaService(CategoriaDao categoriaDao, UsuarioDao usuarioDao) { 
        this.categoriaDao = categoriaDao;
        this.usuarioDao = usuarioDao;
        
    }

    public List<Categoria> listarCategorias(int idUsuario) {
        return categoriaDao.findByUserId(idUsuario);
    }

    public Categoria salvarCategoria(Categoria categoria) {
        // Verifica se o usuário existe
        if (usuarioDao.consultarPorId(categoria.getIdUsuario()) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado");
        }

        int idGerado = categoriaDao.insert(categoria);
        categoria.setId(idGerado);
        return categoria;
    }

    public void excluirCategoria(int id) {
        categoriaDao.excluir(id);
    }
}