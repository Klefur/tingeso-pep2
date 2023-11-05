package tingeso.backendm3.service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tingeso.backendm3.model.Estudiante;
import tingeso.backendm3.model.Nota;
import tingeso.backendm3.repository.NotaRepository;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


@Service
public class NotaService {
    @Autowired
    NotaRepository notaRep;
    @Autowired
    RestTemplate restTemplate;

    final String estudianteURL = "http://localhost:8082/estudiante/";
    final String cuotaURL = "http://localhost:8083/cuota/";
    public void leerCSV(MultipartFile csvFile) {
        if (csvFile != null) {
            List<String> ruts = new ArrayList<>();
            try (CSVReader csvReader = new CSVReader(new InputStreamReader(csvFile.getInputStream()))) {
                String[] nextRecord;
                while ((nextRecord = csvReader.readNext()) != null) {
                    Estudiante user = restTemplate.exchange(
                            estudianteURL + "rut/" + nextRecord[0],
                            HttpMethod.GET,
                            null,
                            new ParameterizedTypeReference<Estudiante>() {}
                    ).getBody();
                    if (!ruts.contains(nextRecord[0])) {
                        ruts.add(nextRecord[0]);
                    }
                    int nota = Integer.parseInt(nextRecord[1]);
                    notaRep.save(new Nota(nota, user.getId()));
                }

                HttpEntity<List<String>> requestEntity = new HttpEntity<>(ruts);
                restTemplate.exchange(
                        cuotaURL + "dcto-notas" ,
                        HttpMethod.POST,
                        requestEntity,
                        Void.class
                );

            } catch (CsvValidationException | IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public List<Nota> getByUser(Long uId) {
        return notaRep.findAllByIdUsuario(uId);
    }

    public double promedioGeneralNotas(Long uId) {
        List<Nota> notas = getByUser(uId);
        double sumaNotas = 0;
        int cantidadNotas = 0;

        for (Nota nota : notas) {
            sumaNotas += nota.getNota();
            cantidadNotas++;
        }

        if (cantidadNotas == 0) {
            return 0; // Evitar división por cero
        }

        return sumaNotas / cantidadNotas;
    }
}
