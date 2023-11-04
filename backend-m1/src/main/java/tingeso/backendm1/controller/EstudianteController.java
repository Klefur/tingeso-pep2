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

    @PostMapping()
    public String guardarUsuario(Estudiante usuario) {
        uServ.crear(usuario);
        return "redirect:/"; // Redirige de nuevo a la lista de usuarios
    }

    @DeleteMapping()
    public String eliminarUsuario(Long id) {
        uServ.delete(id);
        return "Estudiante eliminado";
    }
}
