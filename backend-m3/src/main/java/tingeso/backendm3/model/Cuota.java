package tingeso.backendm3.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class Cuota {
    @Setter @Getter private Long id;
    @Setter @Getter private Integer total;
    @Setter @Getter private Integer nro_cuota;
    @Setter @Getter private Date fecha_plazo;
    @Setter @Getter private Date fecha_pago;
    @Setter @Getter private Boolean pagado = Boolean.FALSE;
    @Setter @Getter private Boolean atrasado = Boolean.FALSE;
    @Setter @Getter private Integer dcto_aplicable;
    @Setter @Getter private Integer interes_acumulado;
    @Setter @Getter private Long usuarioId;
}
