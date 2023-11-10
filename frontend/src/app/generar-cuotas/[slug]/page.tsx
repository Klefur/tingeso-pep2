"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Cuota {
    nro_cuota: number;
}

interface Estudiante {
	id: number;
    nombres: string;
    apellidos: string;
    rut: string;
    fecha_nacimiento: string;
    nombre_colegio: string;
    grad_year: string;
    tipo_colegio: {
		id: number;
		nombre: string;
        max_cuotas: number;
	}
}

export default function Home({ params }: { params: { slug: string } }) {
    const [estudiante, setEstudiante] = useState<Estudiante>({
        id: 0,
        nombres: '',
        apellidos: '',
        rut: '',
        fecha_nacimiento: '',
        nombre_colegio: '',
        grad_year: '',
        tipo_colegio: {
            id: 0,
            nombre: '',
            max_cuotas: 0
        }
    }
);
    const [cuota, setCuota] = useState<Cuota>({
        nro_cuota: 0
    });

    const getEstudiante = async () => {
        const res = await fetch(`http://localhost:8080/estudiante/${params.slug}`);
        const estudiante = await res.json();
        setEstudiante(await estudiante);
    }

    useEffect(() => {getEstudiante()}, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if ( parseInt(value) > estudiante.tipo_colegio.max_cuotas) {
            alert(`El máximo de cuotas para este tipo de colegio es ${estudiante.tipo_colegio.max_cuotas}`);
            return;
        }

        setCuota({
        ...cuota,
        [name]: value,
        });
    }

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const cuotasForm = {
            ...cuota
        };

        console.log(JSON.stringify(cuotasForm));
        try {
            await fetch(`http://localhost:8080/cuota/${params.slug}`, {
                method: 'POST',
                body: JSON.stringify(cuotasForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            router.push(`/ver-cuotas/${params.slug}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col bg-indigo-light px-10 text-white rounded-md w-fit">
        <h1 className="text-2xl pt-6"> Formulario para cuotas </h1>
        <p className="pb-2">1 cuota equivale a contado</p>
        <div className="py-3 flex flex-col">
            <div className="pb-5">
                <label htmlFor="nro_cuota" className="mr-1">Cantidad de cuotas: </label>
                <input type="number" 
                       name="nro_cuota" 
                       className="me-6 text-black rounded-md pl-2"
                       min={1}
                       max={estudiante.tipo_colegio.max_cuotas}
                       value={cuota.nro_cuota}
                       onChange={handleChange}/>
            </div>
            
            <button type="submit" className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black"
                onClick={handleSubmit}>
                    Aceptar
            </button>
        </div>
    </div>
    )
}