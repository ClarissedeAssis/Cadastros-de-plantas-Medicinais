package br.cefet.trabalho.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

     @Getter
	 @Setter
	 @AllArgsConstructor
	 @NoArgsConstructor
	 public class Email {
	  private String para;
	  private String assunto;
	  private String texto;
	  private String caminhoParaAnexo;
	 }

