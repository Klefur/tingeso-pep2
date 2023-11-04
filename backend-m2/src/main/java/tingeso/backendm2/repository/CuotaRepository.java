package tingeso.backendm2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backendm2.model.Cuota;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {
    Cuota findByRut(String rut);
}
