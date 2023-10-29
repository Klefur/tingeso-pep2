'use client';

const data = {
	estudiantes: [
		{
			id: 1,
			nombre: 'Juan',
			apellido: 'Perez',
			edad: 23,
		},
		{
			id: 2,
			nombre: 'Alejandro',
			apellido: 'Perez',
			edad: 23,
		},
		{
			id: 3,
			nombre: 'Martin',
			apellido: 'Perez',
			edad: 23,
		},
	],
};

export default function Home() {
	return (
		<div className="flex h-full">
			<div className="flex flex-col">
				<div className="bg-blue-500 px-4 rounded-md py-1 me-3 h-full">
					{data.estudiantes.map((estudiante) => (
						<div className="flex flex-col bg-blue-200 rounded-md my-2">
							<div className="mx-3 text-center">{estudiante.nombre}</div>
							<div className="mx-3 text-center">{estudiante.apellido}</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full bg-slate-300 rounded-md px-3 pt-2 mb-2">
				informacion estudiante
			</div>
		</div>
	);
}
