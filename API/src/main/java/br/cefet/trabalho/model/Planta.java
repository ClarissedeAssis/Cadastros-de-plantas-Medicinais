package br.cefet.trabalho.model;

import java.awt.geom.Arc2D.Double;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Planta {

	private int id;
	private BigDecimal avaliacaoGeral;

	@NotBlank(message = "O nome popular é uma informação obrigatória")
	@Size(min = 2, max = 30)
	private String nomePopular;

	@NotBlank(message = "O nome científico é uma informação obrigatória")
	@Size(min = 2, max = 30)
	private String nomeCientifico;

	@NotBlank(message = "A origem é uma informação obrigatória")
	@Size(min = 2, max = 30)
	private String origem;
	
	@NotBlank(message= "A descrição é uma informação obrigatória")
	@Size(min=2, max=5000)
	private String aplicacoesMedicinais;
	
	
	private String arquivoFoto;
	
	 public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }

	 
	}