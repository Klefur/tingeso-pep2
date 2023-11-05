'use client';
import { useState } from 'react';

export default function Header() {
	const [topEducationVisible, setTopEducationVisible] = useState(false);

	const toggleTopEducation = () => {
		setTopEducationVisible(!topEducationVisible);
	};

	return (
		<header className="flex flex-col bg-indigo-light p-4 items-center text-white">
			<div className="flex pb-5">
				<img
					src="./menu.svg"
					className="invert cursor-pointer"
					onClick={toggleTopEducation}
				/>
				{topEducationVisible ? (
					<h1 className="text-xl font-bold mx-3">
						Top Education
					</h1>
				) : null}
			</div>
			<div className="flex flex-col h-full w-full">
				<a
					href="/"
					className="flex justify-start my-1 hover:text-blue-100"
				>
					<img src="./groups.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<p className='mx-3'>Ver estudiantes</p>
					) : null}
				</a>
				<a
					href="/agregar-estudiante"
					className="flex justify-start my-1 hover:text-blue-100"
				>
					<img src="./add.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<p className='mx-3'>Añadir estudiante</p> 
						): null}
				</a>
				<a
					href="/subir-notas"
					className="flex justify-start my-1 hover:text-blue-100"
				>
					<img src="./file.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<p className='mx-3'>Subir notas</p>
					) : null}
				</a>
			</div>
		</header>
	);
}
