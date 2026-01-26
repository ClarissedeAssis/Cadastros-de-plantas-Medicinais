package br.cefet.trabalho.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlantaFilter {

    private String nomePopular;
    private String nomeCientifico;
    private String origem;
    private String aplicacoesMedicinais;

    
   
	
}
