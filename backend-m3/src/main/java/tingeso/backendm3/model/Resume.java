package tingeso.backendm3.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class Resume {
    Integer total_examenes;
    Double puntaje_promedio;
    Integer total;
    Integer total_base;
    Integer pagado;
    Integer por_pagar;
    Integer cantidad_cuotas;
    Integer cuotas_pagadas;
    Integer cuotas_atrasadas;
    Date ultimo_pago;
}
