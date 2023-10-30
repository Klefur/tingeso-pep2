'use client';
import { useState } from 'react';

export default function Header() {
	const [topEducationVisible, setTopEducationVisible] = useState(true);

	const toggleTopEducation = () => {
		setTopEducationVisible(!topEducationVisible);
	};

	return (
		<header className="flex flex-col bg-blue-800 p-4 items-center">
			<div className="flex">
				<img
					src="./menu.svg"
					className="invert cursor-pointer"
					onClick={toggleTopEducation}
				/>
				{topEducationVisible ? (
					<h1 className="text-white text-xl font-bold">
						Top Education
					</h1>
				) : null}
			</div>
			<div className="flex flex-col h-full text-white">
				<a
					href="/agregar-estudiante"
					className="flex justify-start hover:text-slate-300 my-1"
				>
					<img src="./add.svg" className="invert cursor-pointer" />
					{topEducationVisible ? <p>Añadir estudiante</p> : null}
				</a>
				<a
					href="/"
					className="flex justify-start hover:text-slate-300 my-1"
				>
					<img src="./groups.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<p className="hover:text-slate-300">Ver estudiantes</p>
					) : null}
				</a>
				<a
					href="/subir-notas"
					className="flex justify-start hover:text-slate-300 my-1"
				>
					<img src="./file.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<p className="hover:text-slate-300">Subir notas</p>
					) : null}
				</a>
			</div>
		</header>
	);
}
