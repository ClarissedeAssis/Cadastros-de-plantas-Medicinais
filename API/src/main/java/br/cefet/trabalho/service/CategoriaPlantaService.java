package br.cefet.trabalho.service;

import br.cefet.trabalho.dao.CategoriaPlantaDao;
import br.cefet.trabalho.model.Categoria;
import br.cefet.trabalho.model.CategoriaPlanta;
import br.cefet.trabalho.model.Planta;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaPlantaService {

    private final CategoriaPlantaDao categoriaPlantaDao;

    public CategoriaPlantaService(CategoriaPlantaDao categoriaPlantaDao) {
        this.categoriaPlantaDao = categoriaPlantaDao;
    }

    public Categoria findById(int id) {
        return categoriaPlantaDao.findById(id);
    }

    public void associarPlantas(CategoriaPlanta categoriaPlanta) {
        for (Integer idPlanta : categoriaPlanta.getIdPlanta()) {
            if (categoriaPlantaDao.verificarAssociacaoExistente(categoriaPlanta.getIdCategoria(), idPlanta) == 0) {
                categoriaPlantaDao.associarPlantas(categoriaPlanta.getIdCategoria(), List.of(idPlanta));
            }
        }
    }

    public List<Integer> consultarPlantasPorCategoria(int idCategoria) {
        return categoriaPlantaDao.consultarPlantasPorCategoria(idCategoria);
    }

    public void removerAssociacao(int idCategoria, int idPlanta) {
        categoriaPlantaDao.removerAssociacao(idCategoria, idPlanta);
    }

    public List<Categoria> getCategoriasPorPlanta(int idPlanta) {
        return categoriaPlantaDao.findCategoriasByPlantaId(idPlanta);
    }
 
}
