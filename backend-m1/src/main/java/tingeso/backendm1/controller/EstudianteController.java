package tingeso.backendm1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import tingeso.backendm1.model.Estudiante;
import tingeso.backendm1.service.EstudianteService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/estudiante")
@CrossOrigin
public class EstudianteController {
    @Autowired
    EstudianteService uServ;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(true);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
    }

    @GetMapping()
    public List<Estudiante> getALl() {
        return uServ.getALl();
    }

    @GetMapping("/rut")
    public Estudiante getByRut(@RequestBody String rut) {
        return uServ.findByRut(rut);
    }

    @GetMapping("/{id}")
    public Estudiante getById(@PathVariable Long id) {
        return uServ.show(id);
    }

    @PostMapping()
    public Estudiante guardarUsuario(@RequestBody Estudiante estudiante) {
        return uServ.crear(estudiante);
    }

    @DeleteMapping()
    public String eliminarUsuario(Long id) {
        uServ.delete(id);
        return "Estudiante eliminado";
    }
}
