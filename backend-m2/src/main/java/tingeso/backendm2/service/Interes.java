package tingeso.backendm2.service;

import java.util.ArrayList;
import java.util.List;

public class Interes {
    public List<List<Integer>> interes;

    Interes() {
        interes = new ArrayList<>();
        interes.add(new ArrayList<>());
        interes.get(0).add(0);
        interes.get(0).add(0);
        interes.add(new ArrayList<>());
        interes.get(1).add(1);
        interes.get(1).add(3);
        interes.add(new ArrayList<>());
        interes.get(2).add(2);
        interes.get(2).add(6);
        interes.add(new ArrayList<>());
        interes.get(3).add(3);
        interes.get(3).add(9);
        interes.add(new ArrayList<>());
        interes.get(4).add(4);
        interes.get(4).add(15);

    }

}