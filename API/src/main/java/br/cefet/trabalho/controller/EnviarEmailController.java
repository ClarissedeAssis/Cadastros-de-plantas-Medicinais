package br.cefet.trabalho.controller;


import br.cefet.trabalho.model.Email;
import br.cefet.trabalho.service.EmailService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/email")
public class EnviarEmailController {
 private final EmailService emailService;

 public EnviarEmailController(EmailService emailService) {
  this.emailService = emailService;
 }

 @PostMapping("/simples")
 public void enviarMensagemSimples(@Valid @RequestBody Email email) {
  emailService.sendSimpleMessage(email.getPara(), email.getAssunto(), email.getTexto());
 }

}