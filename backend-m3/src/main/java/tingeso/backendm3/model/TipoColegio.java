package tingeso.backendm3.model;

import lombok.Getter;
import lombok.Setter;

public class TipoColegio {
    @Setter @Getter private Long id;
    @Setter @Getter private String nombre;
    @Setter @Getter private int max_cuotas;
    @Setter @Getter private int dcto;
}
