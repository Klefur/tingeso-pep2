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
		<div className="flex justify-center items-center flex-col w-full my-5">
			<div className="bg-blue-500 px-4 rounded-md py-1">
				<div className="grid grid-cols-4 rounded-md my-2">
					<div className="mx-3 text-white">ID</div>
					<div className="mx-3 text-white">Nombres</div>
					<div className="mx-3 text-white">Apellidos</div>
					<div className="mx-3 text-white">Edad</div>
				</div>
				{data.estudiantes.map((estudiante) => (
					<div className="grid grid-cols-4 bg-blue-200 rounded-md my-2">
						<div className="mx-3">{estudiante.id}</div>
						<div className="mx-3">{estudiante.nombre}</div>
						<div className="mx-3">{estudiante.apellido}</div>
						<div className="mx-3  ">{estudiante.edad}</div>
					</div>
				))}
			</div>
		</div>
	);
}
