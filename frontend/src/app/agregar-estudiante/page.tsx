export default function Home() {
    return (
        <div className="flex flex-col bg-indigo-light px-10 text-white rounded-md w-fit">
            <h1 className="text-2xl pt-6 pb-3"> Datos de estudiante</h1>
            <div className="py-3 flex flex-col">
                <div className="pb-5">
                    <label htmlFor="nombres" className="mr-1">Nombres: </label>
                    <input type="text" name="nombres" placeholder="Ingrese los nombres" className="me-6 text-black rounded-md pl-2"/>
                    <label htmlFor="apellidos" className="mr-1">Apellidos: </label>
                    <input type="text" name="apellidos" placeholder="Ingrese los apellidos" className="text-black rounded-md pl-2" />
                </div>
                <div className="pb-5">
                    <label htmlFor="rut" className="mr-1">Rut: </label>
                    <input type="text" name="rut" placeholder="Ingrese el rut" className="text-black rounded-md pl-2 me-6"/>
                    <label htmlFor="fechaNacimiento" className="mr-1">Fecha de nacimiento: </label>
                    <input type="date" name="fechaNacimiento" className="text-black rounded-md pl-2 me-6"/>
                </div>
                <div className="pb-5">
                    <label htmlFor="nombreColegio">Nombre del colegio: </label>
                    <input type="text" name="nombreColegio" placeholder="Ingrese el nombre del colegio" className="text-black rounded-md pl-2 w-60"/>
                </div>
                <div className="pb-5">
                    <label htmlFor="fechaEgreso" className="mr-1">Fecha de egreso: </label>
                    <input type="date" name="fechaEgreso" className="text-black rounded-md px-2 me-6"/>
                    <label htmlFor="id_tipo_colegio" className="mr-1">Tipo de colegio: </label>
                    <select className="text-black rounded-md pl-2 py-[3px]" id="id_tipo_colegio" name="id_tipo_colegio" required>
                        <option value="1">Público</option>
                        <option value="2">Privado</option>
                        <option value="3">Subvencionado</option>
                    </select>
                </div>
                <a href="/" className="mx-auto">
                    <button type="submit" className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black">Aceptar</button>
                </a>
            </div>
        </div>
    );
}