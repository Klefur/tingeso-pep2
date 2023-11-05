package tingeso.backendm3.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class Estudiante {
    @Setter @Getter private Long id;
    @Setter @Getter private String nombres;
    @Setter @Getter private String apellidos;
    @Setter @Getter private String rut;
    @Setter @Getter private Date fecha_nacimiento;
    @Setter @Getter private Integer grad_year;
    @Setter @Getter private String nombre_colegio;
    @Setter @Getter private TipoColegio tipo_colegio;
}
