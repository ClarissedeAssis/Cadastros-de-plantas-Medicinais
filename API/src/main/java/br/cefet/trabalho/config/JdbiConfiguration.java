package br.cefet.trabalho.config;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.cefet.trabalho.dao.CategoriaDao;
import br.cefet.trabalho.dao.CategoriaPlantaDao;
import br.cefet.trabalho.dao.UsuarioDao;
import java.nio.file.Paths;

import javax.sql.DataSource;

@Configuration
public class JdbiConfiguration implements WebMvcConfigurer {

    @Bean
    public Jdbi jdbi(DataSource dataSource) {
        return Jdbi.create(dataSource).installPlugin(new SqlObjectPlugin()); 
    }

    @Bean
    public CategoriaDao categoriaDao(Jdbi jdbi) {
        return jdbi.onDemand(CategoriaDao.class);
    }
    
    @Bean
    public UsuarioDao usuarioDao(Jdbi jdbi) {
        return jdbi.onDemand(UsuarioDao.class);
    }
    
    @Bean
    public CategoriaPlantaDao categoriaPlantaDao(Jdbi jdbi) {
        return jdbi.onDemand(CategoriaPlantaDao.class);
    }
    
  
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/fotos/**")
            .addResourceLocations("file:///C:/Users/Usuario/package/uploads/fotos/");
    }
    
  
    
    
}
