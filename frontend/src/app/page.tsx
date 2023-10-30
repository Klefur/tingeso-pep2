'use client';

import { useState } from 'react';

export default function Home() {
	const data = {
		estudiantes: [
			{
				id: 1,
				nombre: 'Juan Ignacio Camilo',
				apellido: 'Perez Da Silva',
				edad: 20,
			},
			{
				id: 2,
				nombre: 'Alejandro Martin',
				apellido: 'Perez Sanchez',
				edad: 24,
			},
			{
				id: 3,
				nombre: 'Martin Luis',
				apellido: 'Perez Montes',
				edad: 27,
			},
		],
	};

	const [estudiante, setEstudiante] = useState(data.estudiantes[0]);

	const selectEstudiante = (id) => {
		setEstudiante(
			data.estudiantes.find((estudiante) => estudiante.id === id)
		);
	};

	return (
		<div className="flex h-full bg-gray-300 rounded-md">
			<div className="flex flex-col">
				<div className="flex flex-col border-black border rounded-s-md px-4 py-1 h-full">
					{data.estudiantes.map((estudiante) => (
						<button
							id={estudiante.id.toString()}
							className="p-1 border border-black bg-blue-600 hover:bg-blue-900 rounded-md  my-2 text-white text-sm"
							onClick={() => selectEstudiante(estudiante.id)}
						>
							<div className="text-center h-12 w-40">
								{estudiante.nombre}
								<br />
								{estudiante.apellido}
							</div>
						</button>
					))}
				</div>
			</div>
			<div className="border-black border rounded-e-md flex w-full px-3 pt-2">
				{estudiante.nombre}
				<br />
				{estudiante.apellido}
				<br />
				{estudiante.edad}
			</div>
		</div>
	);
}
