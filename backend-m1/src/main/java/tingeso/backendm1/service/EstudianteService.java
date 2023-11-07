package tingeso.backendm1.service;

import org.springframework.web.client.RestTemplate;
import tingeso.backendm1.model.Estudiante;
import tingeso.backendm1.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRep;

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
}
