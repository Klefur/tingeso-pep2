package tingeso.backendm1.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class Nota {
    @Setter @Getter private Long id;
    @Setter @Getter private Integer nota;
    @Setter @Getter private Date fecha;
    @Setter @Getter private Long id_usuario;
}
