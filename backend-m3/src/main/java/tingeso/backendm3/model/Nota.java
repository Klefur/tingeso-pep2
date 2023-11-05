package tingeso.backendm3.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Table(name = "cuota")
@NoArgsConstructor
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter @Getter private Long id;

    @Setter @Getter private Integer nota;
    @Setter @Getter private Date fecha;
    @Column(name = "id_usuario")
    @Setter @Getter private Long idUsuario;

    public Nota(Integer nota, Long idUsuario) {
        this.nota = nota;
        this.fecha = new Date();
        this.idUsuario = idUsuario;
    }
}
