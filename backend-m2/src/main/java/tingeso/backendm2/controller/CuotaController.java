package tingeso.backendm2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tingeso.backendm2.model.Cuota;
import tingeso.backendm2.service.CuotaService;

import java.util.List;

@RestController
@RequestMapping("/cuota")
@CrossOrigin
public class CuotaController {

    @Autowired
    CuotaService pagServ;

    @PostMapping("/{userId}")
    public String generarCuotas(@RequestBody Cuota cuotasForm, @PathVariable Long userId) {
        pagServ.generarCuotas(cuotasForm, userId);
        return "cuotas generadas";
    }

    @GetMapping("/ver-cuotas/{userId}")
    public List<Cuota> cuotasUsuario(@PathVariable Integer userId) {
        return pagServ.getALlByUser(userId);
    }

    @GetMapping("/ver-descuentos/{userId}")
    public List<Integer> descuentosUsuario(@PathVariable Integer userId) {

        List<Cuota> cuotas = pagServ.getALlByUser(userId);

        return pagServ.getDescuentos(cuotas);
    }

    @GetMapping("/ver-interes/{userId}")
    public List<Integer> interesesUsuario(@PathVariable Integer userId) {
        List<Cuota> cuotas = pagServ.getALlByUser(userId);
        return pagServ.getInteres(cuotas);
    }

    @PostMapping("/pagar-cuota")
    public String pagarCuota(@RequestParam("cuotaId") Long cuotaId) {
        pagServ.pagarCuota(cuotaId);
        return "Cuota Pagada";
    }

    @PostMapping("/dcto-notas")
    public String aplicarDescuentoNotas(@RequestBody List<String> ruts) {
        pagServ.dctoNotas(ruts);
        return "descuentos aplicados";
    }
}
