'use client';

import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react';
import { addDish } from "../../../api/api"
import { getLocals } from '../../../api/api';
import { useRouter, useParams } from 'next/navigation';

const AltaLocal = () => {
    const { localIdParam } = useParams();
    const [name , setName] = useState("");
    const [category , setCategory] = useState("");
    const [localId , setLocalId] = useState("");
    const [city , setCity] = useState("");
    const [price , setPrice] = useState("");
    const [description , setDescription] = useState("");
    const [locals, setLocals] = useState([]);
    
    const router = useRouter();

    useEffect(() => {    
      const fetchLocals = async () => {
        const data = await getLocals();
        setLocals(data);
        setLocalId(localIdParam);
      };
      fetchLocals();
    }, []);

    useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      router.push('/');
    }
  }, [router]);

    const handleClick = (e) => {
        e.preventDefault();
        addDish(name, category, localId, city, price, description);
        if(localIdParam === "-1") router.push("/ListadoPlatos");
        else router.push(`/DetalleLocal/${localIdParam}`);
    }

    return(
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="mx-auto max-w-2xl text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Alta de Platillo</h2>
        <p className="mt-2 text-gray-600">Completa la información para registrar un nuevo platillo.</p>
      </div>

      <div className="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100">
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Nombre</label>
            <input
              id="name" name="name" type="text" onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="price-range" className="block text-sm font-semibold text-gray-900 mb-2">Categoria</label>
            <div className="relative">
              <select
                id="price-range" name="price-range" onChange={(e) => setCategory(e.target.value)}
                className="block w-full appearance-none rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="ENTRADA">Entrada</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="POSTRE">Postre</option>
                <option value="BEBIDA">Bebida</option>
                <option value="OTROS">Otros</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />               
            </div>
          </div>
          
          <div>
            <label htmlFor="price-range" className="block text-sm font-semibold text-gray-900 mb-2">Local</label>
            <select
              id="local"
              value={localId}
              onChange={(e) => setLocalId(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
            >
              {locals.map((local) => (
                <option key={local.id} value={local.id}>{local.id}: {local.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">Ciudad</label>
            <input
              id="city" name="city" type="text" onChange={(e) => setCity(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">Precio ($)</label>
            <input
              id="price" name="price" type="text" onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">Descripcion</label>
            <textarea
              id="description" name="description" rows={4} onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2 mt-2 border-t border-gray-100 pt-8">
            <button
              type="submit"
              onClick={handleClick}
              className="block w-full rounded-xl bg-indigo-600 px-4 py-4 text-center text-sm font-bold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all"
            >
              Publicar Platillo
            </button>
          </div>

        </form>
      </div>
    </div>
    );
}

export default AltaLocal;