package br.cefet.trabalho;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "br.cefet.trabalho") // ✅ Garante que Spring escaneie tudo
public class TrabalhoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TrabalhoApplication.class, args);
        
    }
}
