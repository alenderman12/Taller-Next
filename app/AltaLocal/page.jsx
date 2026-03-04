'use client';

import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react';
import { addLocal } from "../../api/api"
import { useRouter } from 'next/navigation';

const AltaLocal = () => {
    const [name , setName] = useState("");
    const [type , setType] = useState("");
    const [priceRange , setPriceRange] = useState("");
    const [city , setCity] = useState("");
    const [zone , setZone] = useState("");
    const [address , setAddress] = useState("");
    const [openHour , setOpenHour] = useState("");
    const [closeHour , setCloseHour] = useState("");
    const [photo , setPhoto] = useState("");
    const [photos , setPhotos] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      router.push('/');
    }
  }, [router]);

    const handleClick = (e) => {
        e.preventDefault();
        const hours = openHour + " - " + closeHour;
        console.log(name, type, priceRange, city, zone, address, hours, photos);
        addLocal(name, type, priceRange, city, zone, address, hours, photos);
        router.push("/ListadoPrincipal");
    }

    const handleAddPhoto = (e) => {
        e.preventDefault();
        if(photo.trim() === "" || photos.includes(photo)) return;
        setPhotos((prev) => [...prev , photo]);
        setPhoto("");
    }

    const handleDeletePhoto = (p) => {
        setPhotos((prev) => prev.filter((ph) => ph !== p));
    }

    return(
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="mx-auto max-w-2xl text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Alta de Local</h2>
        <p className="mt-2 text-gray-600">Completa la información para registrar un nuevo establecimiento.</p>
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
            <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">Ciudad</label>
            <input
              id="city" name="city" type="text" onChange={(e) => setCity(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-semibold text-gray-900 mb-2">Zona</label>
            <input
              id="zone" name="zone" type="text" onChange={(e) => setZone(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">Dirección</label>
            <input
              id="address" name="address" type="text" onChange={(e) => setAddress(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="open-hour" className="block text-sm font-semibold text-gray-900 mb-2">Hora de apertura</label>
            <input
              id="open-hour" name="open-hour" type="time" onChange={(e) => setOpenHour(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="close-hour" className="block text-sm font-semibold text-gray-900 mb-2">Hora de cierre</label>
            <input
              id="close-hour" name="close-hour" type="time" onChange={(e) => setCloseHour(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
            />
          </div>
         
          <div>
            <label htmlFor="price-range" className="block text-sm font-semibold text-gray-900 mb-2">Rango de Precio</label>
            <div className="relative">
              <select
                id="price-range" name="price-range" onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full appearance-none rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />               
            </div>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-900 mb-2">Tipo de Local</label>
            <div className="relative">
              <select
                id="type" name="type" onChange={(e) => setType(e.target.value)}
                className="block w-full appearance-none rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="CAFETERIA">Cafetería</option>
                <option value="RESTAURANTE">Restaurante</option>
                <option value="BAR">Bar</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Otros</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />               
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-900 mb-2">Enlace de foto</label>
            <div className="flex gap-3">
              <input
                id="photo" name="photo" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://ejemplo.com/foto.jpg"
                className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 transition-all"
              >
                Agregar
              </button>
            </div>
          </div>

          {photos.length > 0 && (
            <div className="sm:col-span-2">
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {photos.map((p) => (
                  <div key={p} className="relative group">
                    <img src={p} alt="Vista previa" className='w-full h-24 object-cover rounded-xl border border-gray-200 shadow-sm' />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(p)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 focus:outline-none transition-transform group-hover:scale-110"
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sm:col-span-2 mt-6 border-t border-gray-100 pt-8">
            <button
              type="submit"
              onClick={handleClick}
              className="block w-full rounded-xl bg-indigo-600 px-4 py-4 text-center text-sm font-bold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all"
            >
              Publicar Local
            </button>
          </div>

        </form>
      </div>
    </div>
    );
}

export default AltaLocal;