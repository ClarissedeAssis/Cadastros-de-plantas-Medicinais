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
public class Usuario {
	
	private Integer id;
	private int idCategoria;	
	
	@NotBlank(message= "O nome é uma informação obrigatória")
	@Size(min=2, max=30)
	private String nome;
	
	@NotBlank(message= "O E-mail é uma informação obrigatória")
	@Size(min=2, max=30)
	private String email;
	
	@NotBlank(message= "A senha é uma informação obrigatória")
	@Size(min=8, max=8)
	private String senha;
	
	private String arquivoFotoUsuario;
	
	
	
}