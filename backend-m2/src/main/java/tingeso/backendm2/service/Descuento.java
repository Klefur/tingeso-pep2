package tingeso.backendm2.service;

import java.util.ArrayList;
import java.util.List;

public class Descuento {
    public List<List<Integer>> descuento_egreso;
    public List<List<Integer>> descuento_nota;

    Descuento () {
        descuento_egreso = new ArrayList<>();
        descuento_egreso.add(new ArrayList<>());
        descuento_egreso.get(0).add(0);
        descuento_egreso.get(0).add(15);
        descuento_egreso.add(new ArrayList<>());
        descuento_egreso.get(1).add(2);
        descuento_egreso.get(1).add(8);
        descuento_egreso.add(new ArrayList<>());
        descuento_egreso.get(2).add(4);
        descuento_egreso.get(2).add(4);

        descuento_nota = new ArrayList<>();
        descuento_nota.add(new ArrayList<>());
        descuento_nota.get(0).add(950);
        descuento_nota.get(0).add(10);
        descuento_nota.add(new ArrayList<>());
        descuento_nota.get(1).add(900);
        descuento_nota.get(1).add(5);
        descuento_nota.add(new ArrayList<>());
        descuento_nota.get(2).add(850);
        descuento_nota.get(2).add(2);
    }

}
