'use client';

import { get } from 'http';
import { useEffect, useState } from 'react';

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
	}
}

export default function Home() {
	const [data , setData] = useState([]);

	const getData = async () => {
		const res = await fetch('http://localhost:8082/estudiante');
		const data = await res.json();
		setData(data);
	}

	useEffect(() => {getData()}, []);

	const [estudiante, setEstudiante] = useState<Estudiante>(data[0]);

	const selectEstudiante = (id: number) => {
		setEstudiante(
			data.find((estudiante) => estudiante.id === id)
		);
	};

	function formatearFecha(fechaString: string): string {
		const fecha: Date = new Date(fechaString);
		const dia = fecha.getDate().toString().padStart(2, "0");
		const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses comienzan en 0
		const anio = fecha.getFullYear().toString();
		return `${dia}-${mes}-${anio}`;
	}
	  

	return (
		<div className="flex h-full rounded-md w-full">
			<div>
				<div className="flex flex-col rounded-s-md ps-4 py-3 overflow-y-scroll min-h-full max-h-[97.42vh] pe-3">
					{data.map((estudiante) => (
						<button
							id={estudiante.id.toString()}
							className="p-1 pt-2 bg-indigo-light hover:bg-charcoal rounded-md  my-2 text-white text-sm"
							onClick={() => selectEstudiante(estudiante.id)}
						>
							<div className="text-center h-12 w-40">
								{estudiante.nombres}
								<br />
								{estudiante.apellidos}
							</div>
						</button>
					))}
				</div>
			</div>
			<div className="rounded-md flex flex-col w-full px-3 pt-2 bg-charcoal text-white">
				<h1 className='text-2xl'>Informe del estudiante</h1>
				{estudiante ? ( <>
				<h2 className='text-xl'>Información personal</h2>
				<div className='flex justify-between'>
					{estudiante ? ( <div>{estudiante.id}</div> )	: null}
					{estudiante ? ( <div>{estudiante.nombres}</div> )	: null}
					{estudiante ? ( <div>{estudiante.apellidos}</div>)	: null}
					{estudiante ? ( <div>{formatearFecha(estudiante.fecha_nacimiento)}</div> )	: null}
				</div>
				<h2 className='text-xl'>Información institucional</h2>
				<div className='flex justify-between'>
					{estudiante ? ( <div>{estudiante.tipo_colegio.id}</div> )	: null}
					{estudiante ? ( <div>{estudiante.nombre_colegio}</div> )	: null}
					{estudiante ? ( <div>{estudiante.grad_year}</div> )	: null}
					{estudiante ? ( <div>{estudiante.tipo_colegio.nombre}</div> )	: null}
				</div>
				<h2 className='text-xl'>Informacion academica</h2>
				<div className='flex justify-between'>
					<div> Examenes rendidos </div>
					<div> Puntaje promedio </div>
				</div>
				<h2 className='text-xl'>Estado de pagos</h2>
				<div className='flex justify-between'>
					<div> Tipo de pago </div>
					<div> Cuotas sin pagar </div>
					<div> Cuotas Pagadas </div>
					<div> Cuotas atrasadas </div>
					<div> Total a pagar </div>
					<div> Precio Base </div>
					<div> Fecha de ultimo pago </div>
				</div>
				<button> Ver Cuotas </button>
				</> )	: null}
				
			</div>
		</div>
	);
}
