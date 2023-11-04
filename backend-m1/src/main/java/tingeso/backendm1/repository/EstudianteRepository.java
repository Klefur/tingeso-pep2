package tingeso.backendm1.repository;

import tingeso.backendm1.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    Estudiante findByRut(String rut);
}
