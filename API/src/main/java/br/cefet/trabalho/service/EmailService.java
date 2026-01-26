package br.cefet.trabalho.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;


@Service
public class EmailService {

    @Value(value = "${spring.mail.host}")
    private String mailHost;

    @Value(value = "${spring.mail.port}")
    private String mailPort;

    @Value(value = "${spring.mail.username}")
    private String mailUserName;

    @Value(value = "${spring.mail.password}")
    private String mailPassword;

    @Value(value = "${spring.mail.properties.mail.smtp.auth}")
    private String mailSmtpAuth;

    @Value(value = "${spring.mail.properties.mail.smtp.starttls.enable}")
    private String mailSmtpStarttlsEnable;

    private final JavaMailSender emailSender;

    @Autowired
    public EmailService(JavaMailSender emailSender){
        this.emailSender = emailSender;
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rmenuserve@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
}