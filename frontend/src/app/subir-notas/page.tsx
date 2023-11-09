'use client';

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    const handleFileUpload = async () => {
      if (!selectedFile) {
        alert('Por favor, selecciona un archivo antes de enviarlo.');
        return;
      }
  
      const formData = new FormData();
      formData.append('csvFile', selectedFile);
  
      try {
        const response = await fetch('http://localhost:8080/nota', {
            method: 'POST',
            body: formData
        });
        console.log('Respuesta de la API:', response);
        router.push('/')
      } catch (error) {
        alert(`Error al enviar el archivo`);
      }
    };

    return (
        <div className="flex flex-col bg-indigo-light px-10 text-white rounded-md w-fit">
            <h1 className="text-2xl pt-6 pb-3"> Datos de archivo</h1>
            <div className="py-3 flex flex-col">
                <div className="pb-5">
                    <input type="file"  className="rounded-md pl-2"
                        onChange={handleFileChange}/>
                </div>
                <button type="submit" className="w-fit bg-slate-200 hover:bg-slate-300 mx-auto rounded-md p-2 text-black"
                    onClick={handleFileUpload}>
                        Subir
                </button>
            </div>
        </div>
    );
}