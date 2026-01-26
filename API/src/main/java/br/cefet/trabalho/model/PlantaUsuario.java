package br.cefet.trabalho.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlantaUsuario {
	private int id;
	 
	private int idPlanta;  
    private int idUsuario;  

    @NotBlank(message = "")
    @Size(min = 2, max = 255)
    private String descricao;

    private int avaliacao;
    
    private String arquivoFotoUsuario; 
}