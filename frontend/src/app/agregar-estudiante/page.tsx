'use client';

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Estudiante {
    nombres: string;
    apellidos: string;
    rut: string;
    fecha_nacimiento: string;
    nombre_colegio: string;
    grad_year: number;
    id_tipo_colegio: number;
}

export default function Home() {
    const [estudiante, setEstudiante] = useState<Estudiante>({
        nombres: '',
        apellidos: '',
        rut: '',
        fecha_nacimiento: '',
        nombre_colegio: '',
        grad_year: null,
        id_tipo_colegio: 1
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === 'id_tipo_colegio') {
          setEstudiante({
            ...estudiante,
            id_tipo_colegio: value as any,
          });
        } else {
          setEstudiante({
            ...estudiante,
            [name]: value,
          });
        }
      };

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { id_tipo_colegio, ...infoEstudiante } = estudiante;
        const formEstudiante = {
            ...infoEstudiante,
            tipo_colegio: { id: id_tipo_colegio as number}
        };

        router.push('/');

        try {
            console.log(JSON.stringify(formEstudiante));
            await fetch('http://localhost:8080/estudiante', {
                method: 'POST',
                body: JSON.stringify(formEstudiante),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col bg-indigo-light px-10 text-white rounded-md w-fit">
            <h1 className="text-2xl pt-6 pb-3"> Datos de estudiante</h1>
            <div className="py-3 flex flex-col">
                <div className="pb-5">
                    <label htmlFor="nombres" className="mr-1">Nombres: </label>
                    <input type="text" 
                           name="nombres" 
                           placeholder="Ingrese los nombres" 
                           className="me-6 text-black rounded-md pl-2"
                           value={estudiante.nombres}
                           onChange={handleChange}/>
                    <label htmlFor="apellidos" className="mr-1">Apellidos: </label>
                    <input type="text" name="apellidos" placeholder="Ingrese los apellidos" className="text-black rounded-md pl-2" 
                            value={estudiante.apellidos} onChange={handleChange}/>
                </div>
                <div className="pb-5">
                    <label htmlFor="rut" className="mr-1">Rut: </label>
                    <input type="text" name="rut" placeholder="Ingrese el rut" className="text-black rounded-md pl-2 me-6"
                            value={estudiante.rut} onChange={handleChange}/>
                    <label htmlFor="fecha_nacimiento" className="mr-1">Fecha de nacimiento: </label>
                    <input type="date" name="fecha_nacimiento" className="text-black rounded-md pl-2 me-6"
                            value={estudiante.fecha_nacimiento} onChange={handleChange}/>
                </div>
                <div className="pb-5">
                    <label htmlFor="nombre_colegio">Nombre del colegio: </label>
                    <input type="text" name="nombre_colegio" placeholder="Ingrese el nombre del colegio" className="text-black rounded-md pl-2 w-60"
                            value={estudiante.nombre_colegio} onChange={handleChange}/>
                </div>
                <div className="pb-5">
                    <label htmlFor="grad_year" className="mr-1">Fecha de egreso: </label>
                    <input type="number" name="grad_year" className="text-black rounded-md px-2 me-6"
                            value={estudiante.grad_year} onChange={handleChange}/>
                    <label htmlFor="id_tipo_colegio" className="mr-1">Tipo de colegio: </label>
                    <select className="text-black rounded-md pl-2 py-[3px]" id="id_tipo_colegio" name="id_tipo_colegio" 
                        value={estudiante.id_tipo_colegio}
                        onChange={handleChange}
                        required>
                        <option value="1">Público</option>
                        <option value="2">Privado</option>
                        <option value="3">Subvencionado</option>
                    </select>
                </div>
                <button type="submit" className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black"
                    onClick={handleSubmit}>
                        Aceptar
                </button>
            </div>
        </div>
    );
}