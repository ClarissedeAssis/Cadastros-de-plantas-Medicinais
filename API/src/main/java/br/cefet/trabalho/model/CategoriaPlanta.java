package br.cefet.trabalho.model;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CategoriaPlanta {

    @NotNull(message = "ID da categoria não pode ser nulo")
    private int idCategoria;

    @NotNull(message = "Lista de IDs das plantas não pode ser nula")
    private List<Integer> idPlanta; // Agora é uma lista de IDs

    // Getters e Setters
    public int getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }

    public List<Integer> getIdPlanta() {
        return idPlanta;
    }

    public void setIdPlantas(List<Integer> idPlanta) {
        this.idPlanta = idPlanta;
    }
}
