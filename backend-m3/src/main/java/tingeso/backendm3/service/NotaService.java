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
import tingeso.backendm3.model.Cuota;
import tingeso.backendm3.model.Estudiante;
import tingeso.backendm3.model.Nota;
import tingeso.backendm3.model.Resume;
import tingeso.backendm3.repository.NotaRepository;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class NotaService {
    @Autowired
    NotaRepository notaRep;
    @Autowired
    RestTemplate restTemplate;

    final String estudianteURL = "http://backend-m1/estudiante/";
    final String cuotaURL = "http://backend-m2/cuota/";
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

    public Resume getResume(Long uId) {
        // Calculo de promedio de notas
        Double promedio_notas = promedioGeneralNotas(uId);

        // Calculo del total de notas
        Integer total_examenes = getByUser(uId).size();

        // Calculo del total a pagar con y sin descuento
        List<Cuota> cuotas = restTemplate.exchange(
                cuotaURL + "ver-cuotas/" + uId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Cuota>>() {}
        ).getBody();

        List<Integer> dcto = restTemplate.exchange(
                cuotaURL + "ver-descuentos/" + uId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Integer>>() {}
        ).getBody();

        List<Integer> interes = restTemplate.exchange(
                cuotaURL + "ver-interes/" + uId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Integer>>() {}
        ).getBody();
        int totalArancel = 0;
        int totalBase = 1500000;

        for (int i = 0; i < cuotas.size(); i++) {
            totalArancel += cuotas.get(i).getTotal() - dcto.get(i) + interes.get(i);
        }
        // Cantidad de cuotas
        Integer cantidad_cuotas = cuotas.size();

        // Calculo de ultima fecha de pago
        Date ultimaFecha = null;

        for (Cuota pago : cuotas) {
            Date fechaPago = pago.getFecha_pago();
            if (fechaPago != null) {
                if (ultimaFecha == null || fechaPago.after(ultimaFecha)) {
                    ultimaFecha = fechaPago;
                }
            }
        }

        // Total pagado y por pagar
        int pagado = 0;
        int pagar  = 0;

        for (int i = 0; i < cuotas.size(); i++) {
            if (cuotas.get(i).getPagado()) {
                pagado += cuotas.get(i).getTotal() - dcto.get(i) + interes.get(i);
            }
            else {
                pagar += cuotas.get(i).getTotal() - dcto.get(i) + interes.get(i);
            }
        }

        // Cantidad de cuotas pagadas y atrasas
        Integer pagadas = 0;
        Integer atrasados = 0;

        for (Cuota cuota : cuotas) {
            if (cuota.getPagado()) {
                pagadas++;
            }
            if (cuota.getAtrasado()) {
                atrasados++;
            }
        }

        return new Resume(
                total_examenes, promedio_notas, totalArancel, totalBase,
                pagado, pagar, cantidad_cuotas, pagadas, atrasados, ultimaFecha
        );
    }
}
