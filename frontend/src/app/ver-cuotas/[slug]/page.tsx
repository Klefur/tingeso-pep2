'use client';
import { useEffect, useState } from "react";

interface Cuota {
    id: number;
    total: number;
    nro_cuota: number;
    fecha_plazo: string;
    fecha_pago: string;
    pagado: boolean;
    atrasado: boolean;
    dcto_aplicable: number;
    interes_acumulado: number;
    idUsuario: number;
}

export default function Page({ params }: { params: { slug: string } }) {
    const [cuotas, setCuotas] = useState<Cuota[]>([]);

    const getCuotas = async () => {
        const res = await fetch(`http://localhost:8080/cuota/ver-cuotas/${params.slug}`);
        const cuotasRes = await res.json();
        setCuotas(await cuotasRes);
        console.log(await cuotasRes);
    }

    useEffect(() => {getCuotas()}, []);

    function formatearFecha(fechaString: string): string {
		const fecha: Date = new Date(fechaString);
		const dia = fecha.getDate().toString().padStart(2, "0");
		const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses comienzan en 0
		const anio = fecha.getFullYear().toString();
		return `${dia}-${mes}-${anio}`;
	}

    const validarPago = (pagado: boolean) => {
        if (pagado) {
            return "Pagado";
        } else {
            return "Pendiente";
        }
    }

    const validarAtraso = (atrasado: boolean) => {
        if (atrasado) {
            return "Atrasado";
        } else {
            return "-";
        }
    }

    const validarFechaPago = (fecha_pago: string) => {
        if (fecha_pago !== null) {
            return formatearFecha(fecha_pago);
        } else {
            return "-";
        }
    }

    const pagar = async (id: number) => {
        const res = await fetch(`http://localhost:8080/cuota/pagar-cuota?cuotaId=${id}`,{ method: 'POST' });
        const cuotasRes = await res.text();
        if (cuotasRes === "Pagado") {
            alert("Cuota pagada");
            getCuotas();
        }
    }

    const handleDisabled = (pagado: boolean) => {
        if (pagado) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="rounded-md flex flex-col w-full px-3 pt-2 bg-charcoal text-white h-full justify-between">
            <div className="px-3">
                <h1 className='text-2xl mb-7 pt-3'>Cuotas: </h1>
                <div className="text-black overflow-y-scroll max-h-[80vh]">
                    {cuotas.map((cuota) => (
                        <div key={cuota.id} className="flex flex-row bg-slate-300 rounded-md p-3 my-2">
                            <div className="grid grid-cols-4 w-full">
                                <p>Cuota {cuota.nro_cuota}</p>
                                <p>Total: ${cuota.total}</p>
                                <p>Descuento: {cuota.total * cuota.dcto_aplicable/100}</p>
                                <p>Multa de atraso: {cuota.total * cuota.interes_acumulado/100}</p>
                                <p>Vencimiento: {formatearFecha(cuota.fecha_plazo)}</p>
                                <p>Pagado el: {validarFechaPago(cuota.fecha_pago)}</p>
                                <p>Estado pago: {validarPago(cuota.pagado)}</p>
                                <p>Estado atraso: {validarAtraso(cuota.atrasado)}</p>
                            </div>
                            <button className="bg-indigo text-white px-3 rounded-md hover:bg-blue-700 disabled:bg-charcoal" onClick={() => pagar(cuota.id)} disabled={handleDisabled(cuota.pagado)}>Pagar</button>
                        </div>
                    ))}
                </div>
            </div>
            <a href={`/generar-cuotas/${params.slug}`} className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black mb-6">
                <button>
                    Crear cuotas
                </button>
            </a>
        </div>
    )
}