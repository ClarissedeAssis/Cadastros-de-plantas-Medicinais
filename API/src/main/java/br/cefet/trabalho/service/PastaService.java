package br.cefet.trabalho.service;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.cefet.trabalho.dao.PastaDao;
import br.cefet.trabalho.model.Pasta;

@Service
public class PastaService {
    private final PastaDao pastaDao;
    
    public PastaService(Jdbi jdbi) {
        this.pastaDao = jdbi.onDemand(PastaDao.class);
    }
    
    public Pasta inserir(Pasta p) {
        if (p.getId() != 0) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Id - informação ilegal.");
        }

        int id = pastaDao.inserir(p);
        p.setId(id);
        return p;
    }
    
    public List<Pasta> consultar() {
        return pastaDao.consultar();
    }

    public Pasta consultarPorId(int id) {
        return pastaDao.consultarPorId(id);
    }
    
    public Pasta alterar(Pasta p) {
        // Validações extras das informações
        int id = p.getId();
        if (id == 0) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "Id é uma informação obrigatória.");
        }
        
        Pasta uAux = pastaDao.consultarPorId(id);
        if (uAux == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pasta não encontrada com o id: " + id + ".");
        }
        
        // Alteração da entidade
        int qtd = pastaDao.alterar(p);
        
        // Validar se a entidade foi alterada corretamente.
        if (qtd != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A quantidade de entidades alteradas é " + qtd + ".");
        }
        
        // Retornar a informação alterada no banco de dados.
        uAux = pastaDao.consultarPorId(id);
        return uAux;
    }

    public Pasta excluir(int id) {
        // Validações extras das informações
        Pasta uAux = pastaDao.consultarPorId(id);
        if (uAux == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pasta não encontrada com o id: " + id + ".");
        }
        
        // Exclusão da entidade
        int qtd = pastaDao.excluir(id);
        
        // Validar se a entidade foi excluída corretamente.
        if (qtd != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A quantidade de entidades excluídas é " + qtd + ".");
        }
        
        return uAux;
    }
}
