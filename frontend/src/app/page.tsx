'use client';
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

interface Resume {
	total_examenes: number;
	puntaje_promedio: number;
	total: number;
	total_base: number;
	pagado: number;
	por_pagar: number;
	cantidad_cuotas: number;
	cuotas_pagadas: number;
	cuotas_atrasadas: number;
	ultimo_pago: string;
}

export default function Home() {
	const [estudiantes , setEstudiantes] = useState<Estudiante[]>([]);
	const [resume, setResume] = useState<Resume>();

	const getData = async () => {
		const res = await fetch('http://localhost:8080/estudiante');
		const estudiantes = await res.json();
		setEstudiantes(await estudiantes);
	}

	const getResume = async (id: number) => {
		const res = await fetch(`http://localhost:8080/nota/${id}/resume`);
		const resume = await res.json();
		setResume(await resume);
	}

	useEffect(() => {getData()}, []);


	const [estudiante, setEstudiante] = useState<Estudiante>();

	const selectEstudiante = async (id: number) => {
		setEstudiante(
			estudiantes.find((estudiante) => estudiante.id === id)
		);
		await getResume(id);
	};
	

	function formatearFecha(fechaString: string): string {
		const fecha: Date = new Date(fechaString);
		const dia = fecha.getDate().toString().padStart(2, "0");
		const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses comienzan en 0
		const anio = fecha.getFullYear().toString();
		return `${dia}-${mes}-${anio}`;
	}
	  
	const validarCantidadCuotas = (cantidad: number) => {
		if (cantidad == 1) {
			return "Contado";
		} else if (cantidad == 0) {
			return "-";
		} else {
			return "Cuotas";
		}
	} 

	return (
		<div className="flex h-full rounded-md w-full">
			<div>
				<div className="flex flex-col rounded-s-md ps-4 py-3 overflow-y-scroll min-h-full max-h-[97.42vh] pe-3">
					{estudiantes.length != 0 ? estudiantes.map((estudiante) => (
						<button
							key={estudiante.id}
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
					)) : (
					<div className="p-1 pt-2 bg-indigo-light rounded-md  my-2 text-white text-sm"> 
						<div className='text-center h-12 w-40'>
							No hay estudiantes registrados 
						</div>
					</div>
						)}
				</div>
			</div>
			<div className="rounded-md flex flex-col w-full px-3 pt-2 bg-charcoal text-white">
				<h1 className='text-2xl mb-5'>Informe del estudiante</h1>
				{estudiante ? ( <>
				<h2 className='text-xl mb-2'>Información personal</h2>
				<div className='grid grid-cols-5 bg-slate-300 rounded-md p-3 text-black mb-2 text-center'>
					<div>
						<h3 className='me-2'>ID estudiante: </h3> 
						<div>{estudiante.id}</div>
					</div>
					<div>
						<h3 className='me-2'>Nombres: </h3>
						<div>{estudiante.nombres}</div>
					</div>
					<div>
						<h3 className='me-2'>Apellidos: </h3>	
						<div>{estudiante.apellidos}</div>
					</div>
					<div>
						<h3 className='me-2'>Rut: </h3>
						<div>{estudiante.rut}</div>
					</div>
					<div>
						<h3 className='me-2'>Fecha de nacimiento: </h3>
						<div>{formatearFecha(estudiante.fecha_nacimiento)}</div>
					</div>
				</div>
				<h2 className='text-xl mb-2'>Información institucional</h2>
				<div className='grid grid-cols-3 bg-slate-300 rounded-md p-3 text-black mb-2 text-center'>
					<div> 
						<h3 className='me-2'>Nombre del Colegio: </h3> 
						<div>{estudiante.nombre_colegio}</div>
					</div>
					<div> 
						<h3 className='me-2'>Año de egreso: </h3>
						<div>{estudiante.grad_year}</div>
					</div>
					<div> 
						<h3 className='me-2'>Tipo de colegio: </h3>
						<div>{estudiante.tipo_colegio.nombre}</div>
					</div>
				</div>
				<h2 className='text-xl mb-2'>Informacion academica</h2>
				<div className='grid grid-cols-2 bg-slate-300 rounded-md p-3 text-black mb-2 text-center'>
					<div className='me-16'>
						<h3>
							Examenes rendidos:
						</h3>
						{resume ? 
							( <div>{resume.total_examenes}</div> )
							:  ( <div>'-'</div> )}
					</div>
					<div> 
						<h3>
							Puntaje promedio:
						</h3>
						{resume ? 
							( <div>{resume.puntaje_promedio}</div> )	
							: ( <div>'-'</div> )}
					</div>
				</div>
				<h2 className='text-xl mb-2'>Estado de pagos</h2>
				<div className='flex flex-col bg-slate-300 rounded-md p-3 text-black mb-2 text-center'>
					<div className='grid grid-cols-5'>
						<div> 
							<h3>
								Tipo de pago 
							</h3>
							{resume ? 
								( <div>{validarCantidadCuotas(resume.cantidad_cuotas)}</div> ) 
								: null}
						</div>
						<div>
							<h3>
								Cantidad de cuotas
							</h3> 
							{resume ? 
								( <div>{resume.cantidad_cuotas}</div> )	
								: null}
						</div>
						<div>
							<h3>
								Cuotas Pagadas
							</h3> 
							{resume ? 
								( <div>{resume.cuotas_pagadas}</div> )	
								: null}
						</div>
						<div>
							<h3>
								Cuotas sin pagar 
							</h3>
							{resume ? 
								( <div>{resume.cantidad_cuotas - resume.cuotas_pagadas}</div> )	
								: null}
						</div>
						<div>
							<h3>
								Cuotas atrasadas
							</h3>
							{resume ? 
								( <div>{resume.cuotas_atrasadas}</div> )
								: null}
						</div>
					</div>
					<div className='grid grid-cols-5 mt-10'>
						<div>
							<h3>
								Total a pagar
							</h3> 
							{resume ? 
								( <div>{resume.total}</div> )
								: null}
						</div>
						<div>
							<h3>
								Precio Base
							</h3> 
							{resume ? ( <div>{
								resume.cantidad_cuotas != 0 ? resume.total_base : 0
							}</div> ) : null}
						</div>
						<div>
							<h3>
								Fecha de ultimo pago
							</h3> 
							{resume ? 
								( <div>{ resume.ultimo_pago == null ? '-' : formatearFecha(resume.ultimo_pago)}</div> )
								: null}
						</div>
						<div>
							<h3>
								Pagado
							</h3> 
							{resume ? 
								( <div>{resume.pagado}</div> )
								: null}
						</div>
						<div>
							<h3>
								Por pagar
							</h3> 
							{resume ? 
								( <div>{resume.por_pagar}</div> )
								: null}
						</div>
					</div>
				</div>
				<a href={`/ver-cuotas/${estudiante.id}`} className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black mt-56">
					<button>
						Ver cuotas
					</button>
				</a>
				</> ) : null}
				
			</div>
		</div>
	);
}
