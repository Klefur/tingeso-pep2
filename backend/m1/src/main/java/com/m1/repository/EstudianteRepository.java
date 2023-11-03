package com.m1.repository;

import com.m1.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    Estudiante findByRut(String rut);
}
