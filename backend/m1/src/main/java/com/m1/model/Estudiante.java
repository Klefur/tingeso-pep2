package com.m1.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Table(name = "estudiante")
@NoArgsConstructor
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter @Getter private Long id;

    @Setter @Getter private String nombres;
    @Setter @Getter private String apellidos;
    @Setter @Getter private String rut;
    @Setter @Getter private Date fecha_nacimiento;
    @Setter @Getter private Integer grad_year;
    @Setter @Getter private String nombre_colegio;
    @Setter @Getter private String tipo_colegio;
}
