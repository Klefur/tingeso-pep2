package tingeso.backendm2.model;

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
public class Cuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter @Getter
    private Long id;

    @Setter @Getter private Integer total;
    @Setter @Getter private Integer nro_cuota;
    @Setter @Getter private Date fecha_plazo;
    @Setter @Getter private Date fecha_pago;
    @Setter @Getter private Boolean pagado = Boolean.FALSE;
    @Setter @Getter private Boolean atrasado = Boolean.FALSE;
    @Setter @Getter private Integer dcto_aplicable;
    @Setter @Getter private Integer interes_acumulado;
    @Column(name = "id_usuario")
    @Setter @Getter private Integer usuarioId;
}
