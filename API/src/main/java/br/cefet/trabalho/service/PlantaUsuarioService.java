package br.cefet.trabalho.service;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.cefet.trabalho.dao.PlantaUsuarioDao;
import br.cefet.trabalho.dao.PlantaDao;
import br.cefet.trabalho.model.PlantaUsuario;

@Service
public class PlantaUsuarioService {

    private final PlantaUsuarioDao plantaUsuarioDao;
    private final PlantaDao plantaDao;

    public PlantaUsuarioService(Jdbi jdbi) {
        this.plantaUsuarioDao = jdbi.onDemand(PlantaUsuarioDao.class);
        this.plantaDao = jdbi.onDemand(PlantaDao.class);
    }

    public PlantaUsuario inserir(PlantaUsuario c) {
        if (c.getId() != 0) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Id - informação ilegal.");
        }

        int id = plantaUsuarioDao.inserir(c);
        c.setId(id);

        // Atualiza avaliação geral da planta após inserir
        atualizarAvaliacaoGeral((long) c.getIdPlanta());

        return c;
    }

    public List<PlantaUsuario> consultar() {
        return plantaUsuarioDao.consultar();
    }

    public PlantaUsuario consultarPorId(int id) {
        return plantaUsuarioDao.consultarPorId(id);
    }

    public List<PlantaUsuario> consultarComentariosPorPlanta(int idPlanta) {
        return plantaUsuarioDao.consultarComentariosPorPlanta(idPlanta);
    }

    public List<PlantaUsuario> consultarComentarios() {
        return plantaUsuarioDao.consultar();
    }

    public PlantaUsuario excluir(int id) {
        // Verifica se o comentário existe
        PlantaUsuario comentario = plantaUsuarioDao.consultarPorId(id);
        if (comentario == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Comentário não encontrado com o id: " + id + ".");
        }

        // Realiza a exclusão
        int qtd = plantaUsuarioDao.excluir(id);
        if (qtd != 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Falha ao excluir o comentário com id: " + id + ". Quantidade de registros excluídos: " + qtd);
        }

        // Atualiza avaliação geral da planta após exclusão
        atualizarAvaliacaoGeral((long) comentario.getIdPlanta());

        return comentario;
    }

    private void atualizarAvaliacaoGeral(Long idPlanta) {
        List<PlantaUsuario> comentarios = plantaUsuarioDao.consultarComentariosPorPlanta(idPlanta.intValue());

        double media = 0.0;
        if (!comentarios.isEmpty()) {
            double soma = comentarios.stream()
                    .mapToDouble(PlantaUsuario::getAvaliacao)
                    .sum();
            media = soma / comentarios.size();
        }

        plantaDao.atualizarAvaliacaoGeral(idPlanta, media);
    }
}