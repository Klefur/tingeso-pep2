export default function Header() {
	return (
		<header className="bg-blue-500 p-4 flex justify-between items-center">
			<div className="text-white text-2xl font-bold">Top Education</div>
			<nav className="space-x-4">
				<a href="/" className="text-white hover:text-slate-300">
					Ver estudiantes
				</a>
				<a href="/agregar-estudiante" className="text-white hover:text-slate-300">
					Agregar estudiante
				</a>
			</nav>
		</header>
	);
}
