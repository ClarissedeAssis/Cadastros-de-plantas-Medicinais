package br.cefet.trabalho.controller.report;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cefet.trabalho.model.Planta;
import br.cefet.trabalho.service.PlantaService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@RequestMapping("/api/v1/report/planta")
public class PlantaReportController {

	@Autowired
    private PlantaService plantaService;
    
    @GetMapping(
        value = "/todos",
        produces = MediaType.APPLICATION_PDF_VALUE
    )
    public ResponseEntity<InputStreamResource> getProdutoReport() throws IOException {
        Date dIni = new Date();
        
        File file = ResourceUtils.getFile("classpath:report/planta.jasper");
        InputStream inputStream = new FileInputStream(file);
        //OutputStream outputStream = new ByteArrayOutputStream();

        List<Planta> plantaList = plantaService.consultar();

        Map parameters = new HashMap();
        JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(plantaList);
        byte [] byteReporte = null;
        try {
            JasperPrint print = JasperFillManager.fillReport(inputStream, parameters, beanColDataSource);
            byteReporte = JasperExportManager.exportReportToPdf(print);
        } catch (JRException e) {
            e.printStackTrace();
        }
        
        Date dFim = new Date();
        System.out.println("Fim report: " + (dFim.getTime() - dIni.getTime()) );

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(new ByteArrayInputStream(byteReporte)));

    }
}
