package tingeso.backendm1.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import tingeso.backendm1.model.Cuota;
import tingeso.backendm1.model.Estudiante;
import tingeso.backendm1.model.Nota;
import tingeso.backendm1.model.Resume;
import tingeso.backendm1.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRep;
    @Autowired
    RestTemplate restTemplate;

    final String cuotaURL = "http://localhost:8083/cuota/";
    final String notaURL = "http://localhost:8084/nota/";

    public Estudiante crear(Estudiante user) {
        return estudianteRep.save(user);
    }

    public List<Estudiante> getALl() {
        return estudianteRep.findAll();
    }

    public Estudiante show(Long id) {
        try {
            return estudianteRep.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    public Estudiante findByRut(String rut) {
        try {
            return estudianteRep.findByRut(rut);
        } catch (Exception e) {
            return null;
        }
    }

    public String delete(Long id) {
        try {
            estudianteRep.deleteById(id);
            return "Se borro usuario";
        } catch (Exception e) {
            return "No existe usuario con ese id";
        }
    }

    public Resume getResume(Long uId) {
        // Calculo de promedio de notas
        Double promedio_notas = restTemplate.exchange(
                notaURL + "promedio/" + uId.toString(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Double>() {}
        ).getBody();

        // Calculo del total de notas
        Integer total_examenes = restTemplate.exchange(
                notaURL + uId.toString(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Nota>>() {}
        ).getBody().size();

        // Calculo del total a pagar con y sin descuento
        List<Cuota> cuotas = restTemplate.exchange(
                cuotaURL + "ver-cuotas/" + uId.toString(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Cuota>>() {}
        ).getBody();

        List<Integer> dcto = restTemplate.exchange(
                cuotaURL + "ver-descuentos/" + uId.toString(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Integer>>() {}
        ).getBody();

        List<Integer> interes = restTemplate.exchange(
                cuotaURL + "ver-interes/" + uId.toString(),
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

        Resume resume = new Resume(
                total_examenes, promedio_notas, totalBase, totalArancel,
                pagado, pagar, cantidad_cuotas, pagadas, atrasados, ultimaFecha
        );

        return resume;
    }
}
