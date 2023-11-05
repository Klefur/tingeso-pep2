package tingeso.backendm1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tipo_colegio")
public class TipoColegio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter @Getter
    private Long id;

    @Setter @Getter private String nombre;
    @Setter @Getter private int max_cuotas;
    @Setter @Getter private int dcto;

    @OneToMany(mappedBy = "tipo_colegio")
    @JsonIgnore
    @Setter @Getter private List<Estudiante> estudiantes;

}
