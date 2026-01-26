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

public class Pasta {

	private int id;
	
	@NotBlank(message= "O nome é uma informação obrigatória")
	@Size(min=2, max=30)
	private String nome;
}
