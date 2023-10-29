'use client';
import { useState } from 'react';

export default function Header() {
	const [topEducationVisible, setTopEducationVisible] = useState(true);

	const toggleTopEducation = () => {
		setTopEducationVisible(!topEducationVisible);
	};

	const openTopEducation = () => {
		const hoverTimer = setTimeout(() => {
			setTopEducationVisible(true);
		}, 500);
	};

	const closeTopEducation = () => {
		setTopEducationVisible(false);
	};

	return (
		<header className="flex flex-col bg-blue-500 p-4 items-center">
			<div className="flex">
				<img
					src="./menu.svg"
					className="invert cursor-pointer me-1"
					onClick={toggleTopEducation}
				/>
				{topEducationVisible ? (
					<div className="text-white text-xl font-bold">
						Top Education
					</div>
				) : null}
			</div>
			<div
				className="flex flex-col h-full"
				onMouseEnter={openTopEducation}
				onMouseLeave={closeTopEducation}
			>
				<div className="flex justify-start">
					<img src="./add.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<a
							href="/agregar-estudiante"
							className="text-white hover:text-slate-300"
						>
							Añadir estudiante
						</a>
					) : null}
				</div>
				<div className="flex justify-start">
					<img src="./groups.svg" className="invert cursor-pointer" />
					{topEducationVisible ? (
						<a href="/" className="text-white hover:text-slate-300">
							Ver estudiantes
						</a>
					) : null}
				</div>
			</div>
		</header>
	);
}
