package tingeso.backendm3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tingeso.backendm3.model.Nota;
import tingeso.backendm3.service.NotaService;

import java.util.List;

@RestController
@RequestMapping("/nota")
@CrossOrigin
public class NotaController {
    @Autowired
    NotaService notaServ;

    @PostMapping()
    public String guardarNotas(@RequestParam("csvFile") MultipartFile csvFile) {
        notaServ.leerCSV(csvFile);
        return "Notas subidas";
    }

    @GetMapping("/{uId}")
    public List<Nota> notasDeUsuario(@PathVariable Long uId) {
        return notaServ.getByUser(uId);
    }

    @GetMapping("/promedio/{uId}")
    public Double calcularPromedio(@PathVariable Long uId) {
        return notaServ.promedioGeneralNotas(uId);
    }
}
