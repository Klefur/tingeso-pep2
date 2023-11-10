package tingeso.backendm2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tingeso.backendm2.model.Cuota;
import tingeso.backendm2.model.Estudiante;
import tingeso.backendm2.repository.CuotaRepository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class CuotaService {
    @Autowired
    CuotaRepository pagoRep;
    @Autowired
    RestTemplate restTemplate;
    Descuento descuentos;
    Interes intereses;
    final Integer arancel = 1500000;
    final String estudianteURL = "http://backend-m1/estudiante/";
    final String notaURL = "http://backend-m3/nota/";

    public void generarCuotas(Cuota cuotasForm, Long userId) {
        Estudiante user = restTemplate.getForEntity(
                estudianteURL + (userId.toString()),
                Estudiante.class
        ).getBody();

        Integer total = arancel / cuotasForm.getNro_cuota();
        descuentos = new Descuento();
        Integer dcto_correspondido = 0;

        if (cuotasForm.getNro_cuota() == 1) {
            dcto_correspondido = 50;
        } else {
            Calendar calendar = Calendar.getInstance();

            for (List<Integer> dcto : descuentos.descuento_egreso) {
                if (calendar.get(Calendar.YEAR) - user.getGrad_year() <= dcto.get(0)) {
                    dcto_correspondido += dcto.get(1);
                    break;
                }
            }
            dcto_correspondido += user.getTipo_colegio().getDcto();
        }

        List<Date> fechas = generarFechasDeVencimiento(cuotasForm.getNro_cuota());

        for (int i = 1; i <= cuotasForm.getNro_cuota(); i++) {
            Cuota cuota = new Cuota();
            cuota.setNro_cuota(i);
            cuota.setTotal(total);
            cuota.setIdUsuario(user.getId());
            cuota.setFecha_plazo(fechas.get(i - 1));
            cuota.setInteres_acumulado(0);
            cuota.setDcto_aplicable(dcto_correspondido);
            if (cuotasForm.getNro_cuota() == 1) {
                cuota.setPagado(true);
                cuota.setFecha_pago(new Date());
            }
            pagoRep.save(cuota);
        }
    }

    public List<Cuota> getALlByUser(Integer uId) {
        List<Cuota> cuotas = pagoRep.findAllByIdUsuario(uId);
        Calendar calendar = Calendar.getInstance();

        if (calendar.get(Calendar.DAY_OF_MONTH) < 5 && calendar.get(Calendar.DAY_OF_MONTH) > 10) {
            cuotas = calcularInteres(cuotas);
        }
        return cuotas;
    }

    public Cuota show(Long id) {
        try {
            return pagoRep.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    public void dctoNotas(List<String> ruts) {
        List<Cuota> cuotas;
        Descuento descuento = new Descuento();
        for (String rut: ruts) {
            Estudiante user = restTemplate.getForEntity(
                    estudianteURL + "rut/" + rut,
                    Estudiante.class
            ).getBody();

            Integer dcto = 0;
            Double promedio = restTemplate.getForEntity(
                    notaURL + "promedio/"+ user.getId().toString(),
                    Double.class
            ).getBody();

            for (List<Integer> dctoNota : descuento.descuento_nota) {
                if ( promedio >= dctoNota.get(0)) {
                    dcto += dctoNota.get(1);
                    break;
                }
            }

            if (dcto != 0) {
                cuotas = pagoRep.findAllByIdUsuario(user.getId().intValue());
                for (Cuota cuota : cuotas) {
                    if (!cuota.getPagado()) {
                        cuota.setDcto_aplicable(cuota.getDcto_aplicable() + dcto);
                        pagoRep.save(cuota);
                    }
                }
            }

        }
    }

    public Long pagarCuota(Long id) {
        Calendar calendar = Calendar.getInstance();
        Cuota temp = show(id);

        if (calendar.get(Calendar.DAY_OF_MONTH) >= 5 && calendar.get(Calendar.DAY_OF_MONTH) <= 10) {
            Date fechaPago = calendar.getTime();
            temp.setFecha_pago(fechaPago);
            temp.setPagado(Boolean.TRUE);
            temp.setAtrasado(Boolean.FALSE);
            System.out.println(temp.getPagado());
            System.out.println(temp.getFecha_pago());
            pagoRep.save(temp);
        }

        return temp.getIdUsuario();
    }

    public List<Cuota> calcularInteres(List<Cuota> cuotas) {
        Integer interes_acumulado = 0;
        Calendar calendar = Calendar.getInstance();
        Calendar fecha = Calendar.getInstance();
        intereses = new Interes();

        for ( Cuota cuota : cuotas ) {
            fecha.setTime(cuota.getFecha_plazo());
            Integer diferencia_meses = calendar.get(Calendar.MONTH) - fecha.get(Calendar.MONTH);
            for (List<Integer> interes : intereses.interes) {
                if (interes.get(0) >= diferencia_meses && !cuota.getPagado()) {
                    interes_acumulado += interes.get(1);
                    break;
                }
            }
        }

        for ( Cuota cuota : cuotas ) {
            if (!cuota.getPagado()) {
                cuota.setInteres_acumulado(interes_acumulado);
                pagoRep.save(cuota);
            }
        }

        return cuotas;
    }

    public String delete(Long id) {
        try {
            pagoRep.deleteById(id);
            return "Se borro pago";
        } catch (Exception e) {
            return "No existe pago con ese id";
        }
    }

    private List<Date> generarFechasDeVencimiento(int n) {
        List<Date> fechas = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, 1);

        for (int i = 0; i < n; i++) {

            // Establecer la fecha al día 10 del mes
            calendar.set(Calendar.DAY_OF_MONTH, 10);

            // Obtener la fecha resultante como un objeto Date
            Date fechaVencimiento = calendar.getTime();

            // Agregar la fecha de vencimiento a la lista
            fechas.add(fechaVencimiento);

            // Avanzar al siguiente mes para la próxima iteración
            calendar.add(Calendar.MONTH, 1);
        }

        return fechas;
    }

    public List<Integer> getDescuentos (List<Cuota> cuotas) {
        List<Integer> descuentos = new ArrayList<>();
        float total;
        for ( Cuota cuota : cuotas ) {
            total = (float) cuota.getTotal() * ((float) cuota.getDcto_aplicable() / 100);
            descuentos.add((int) total);
        }

        return descuentos;
    }

    public List<Integer> getInteres (List<Cuota> cuotas) {
        List<Integer> intereses = new ArrayList<>();
        float total;
        for ( Cuota cuota : cuotas ) {
            total = (float) cuota.getTotal() * ((float) cuota.getInteres_acumulado() / 100);
            intereses.add((int) total);
        }

        return intereses;
    }
}
