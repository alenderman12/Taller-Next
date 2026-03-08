'use client'
import { useState, useEffect } from "react";
import { getLocals } from "../../api/api";
import Link from "next/link";

//Implemente un sistema de puntaje para que el listado de locales muestre primero los mejores locales (revisa si tiene fotos, su rating, si es una prueba, etc)

const calcularPuntaje = (local) => {
  let score = 0;

  const nombre = local.name?.toLowerCase() || "";
  if (nombre.includes("prueba") || nombre.includes("test")) return 0;
  
  if (local.photos && local.photos.length > 0) score += 50;
  if (local.photos && local.photos.length > 1) score += 20;
  score += 15 * (local.ratingAverage / 5 );

  return score;
};

export default function ListadoPrincipal() {
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  useEffect(() => {
    const fetchLocals = async () => {
      const data = await getLocals(query, type, priceRange, rating, city, zone);

      data.sort((a, b) => calcularPuntaje(b) - calcularPuntaje(a));

      setLocals(data);
    };
    fetchLocals();
  }, [query, type, priceRange, rating, city, zone]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Descubre Locales</h2>
          <Link href="/AltaLocal" className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
            + Agregar Local
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "query", label: "Buscar por nombre", value: query, setter: setQuery, type: "text" },
              { id: "rating", label: "Rating mínimo", value: rating, setter: setRating, type: "number" },
              { id: "city", label: "Ciudad", value: city, setter: setCity, type: "text" },
              { id: "zone", label: "Zona", value: zone, setter: setZone, type: "text" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{field.label}</label>
                <input
                  id={field.id} type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)}
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
                />
              </div>
            ))}
            <div>
              <label htmlFor="price-range" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rango de Precio</label>
              <select
                id="price-range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
              >
                <option value="">Cualquiera</option>
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tipo</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
              >
                <option value="">Todos</option>
                <option value="CAFETERIA">Cafetería</option>
                <option value="RESTAURANTE">Restaurante</option>
                <option value="BAR">Bar</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locals?.map((local) => (
            <Link key={local.id} href={`/DetalleLocal/${local.id}`} className="group block">
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <img
                  alt={local.name}
                  src={local.photos && local.photos[0] ? local.photos[0] : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&auto=format&fit=crop"}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5 bg-white relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{local.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{local.city} • {local.zone}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {local.type || 'Local'}
                    </span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{local.priceRange || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {(!locals || locals.length === 0) && (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-gray-400 font-medium">No se encontraron locales que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}