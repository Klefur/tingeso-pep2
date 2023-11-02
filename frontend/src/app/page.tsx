'use client';

import { useState } from 'react';

export default function Home() {
	const data = {
		estudiantes: [
			{
				id: 1,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 2,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			},
			{
				id: 3,
				nombres: 'Juan Ignacio Camilo',
				apellidos: 'Perez Da Silva',
				nombreColegio: 'Colegio San Ignacio',
				rut: '12345678-9',
				fechaNacimiento: '2000-01-01',
				fechaEgreso: '2018-12-31',
				id_tipo_colegio: 1,
			}
		],
	};

	const [estudiante, setEstudiante] = useState(data.estudiantes[0]);

	const selectEstudiante = (id) => {
		setEstudiante(
			data.estudiantes.find((estudiante) => estudiante.id === id)
		);
	};

	return (
		<div className="flex h-full rounded-md w-full">
			<div>
				<div className="flex flex-col rounded-s-md ps-4 py-3 overflow-y-scroll min-h-full max-h-[97.42vh] pe-3">
					{data.estudiantes.map((estudiante) => (
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
				<h2 className='text-xl'>Información personal</h2>
				<div className='flex justify-between'>
					{estudiante ? ( <div>{estudiante.id}</div> )	: null}
					{estudiante ? ( <div>{estudiante.nombres}</div> )	: null}
					{estudiante ? ( <div>{estudiante.apellidos}</div>)	: null}
					{estudiante ? ( <div>{estudiante.fechaNacimiento}</div> )	: null}
				</div>
				<h2 className='text-xl'>Información institucional</h2>
				<div className='flex justify-between'>
					{estudiante ? ( <div>{estudiante.id_tipo_colegio}</div> )	: null}
					{estudiante ? ( <div>{estudiante.nombreColegio}</div> )	: null}
					{estudiante ? ( <div>{estudiante.fechaEgreso}</div> )	: null}
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
			</div>
		</div>
	);
}
