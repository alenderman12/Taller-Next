'use client'
import { useState, useEffect } from "react";
import { getLocals } from "../../api/api";
import Link from "next/link";

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
      setLocals(data);
    };
    fetchLocals();
  }, [query, type, priceRange, rating, city, zone]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Listado de Locales</h2>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "query", label: "Buscar", value: query, setter: setQuery, type: "text" },
              { id: "rating", label: "Rating", value: rating, setter: setRating, type: "number" },
              { id: "city", label: "Ciudad", value: city, setter: setCity, type: "text" },
              { id: "zone", label: "Zona", value: zone, setter: setZone, type: "text" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black border"
                />
              </div>
            ))}

            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Rango de Precio</label>
              <select
                id="price-range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black border"
              >
                <option value="">Cualquiera</option>
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black border"
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

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {locals?.map((local) => (
            <div key={local.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <img
                alt={local.name}
                src={local.photos ? (local.photos[0] ? local.photos[0] : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&auto=format&fit=crop") : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&auto=format&fit=crop"}
                className="aspect-[4/3] w-full object-cover sm:aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/DetalleLocal/${local.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {local.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{local.city} - {local.zone}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {local.type || 'Local'}
                  </span>
                  <p className="text-sm font-medium text-gray-900">{local.priceRange}</p>
                </div>
              </div>
            </div>
          ))}
          {(!locals || locals.length === 0) && (
            <p className="col-span-full text-center text-gray-500 py-10">No se encontraron locales.</p>
          )}
        </div>
      </div>
    </div>
  );
}