import { Inter } from 'next/font/google';
import './ui/globals.css';
import Header from './ui/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Top Education',
	description: 'Aplicacion de Top Education',
};

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body className={`${inter.className} min-h-screen flex`}>
				<Header></Header>
				<main className="flex flex-grow bg-blue-100 p-3 items-center justify-center" >{children}</main>
			</body>
		</html>
	);
}
