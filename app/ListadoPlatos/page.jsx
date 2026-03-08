'use client'
import { useState, useEffect } from "react";
import { getLocals } from "../../api/api";
import { getDishes } from "../../api/api";
import UserLink from "../../components/UserLink";
import Link from "next/link";

export default function ListadoPrincipal() {
  const [dishes, setDishes] = useState([]);
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [city, setCity] = useState("");
  const [localId, setLocalId] = useState("");

  useEffect(() => {
    const fetchLocals = async () => {
      const data = await getLocals();
      setLocals(data);
    };
    fetchLocals();
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      const data = await getDishes(query, category, dateFrom, dateTo, city, localId)
      setDishes(data);
    };
    fetchDishes();
  }, [query, category, dateFrom, dateTo, city, localId]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Descubre Platillos</h2>
          <Link href="/AltaPlatillo/-1" className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
            + Agregar Platillo
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "query", label: "Buscar por nombre", value: query, setter: setQuery, type: "text" },
              { id: "dateFrom", label: "Fecha desde", value: dateFrom, setter: setDateFrom, type: "date" },
              { id: "dateTo", label: "Fecha hasta", value: dateTo, setter: setDateTo, type: "date" },
              { id: "city", label: "Ciudad", value: city, setter: setCity, type: "text" }
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
              <label htmlFor="category" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Categoría</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
              >
                <option value="">Cualquiera</option>
                <option value="ENTRADA">Entrada</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="POSTRE">Postre</option>
                <option value="BEBIDA">Bebida</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>

            <div>
              <label htmlFor="local" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Local</label>
              <select
                id="local"
                value={localId}
                onChange={(e) => setLocalId(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm text-black border outline-none"
              >
                <option value="">Todos</option>
                {locals.map((local) => (
                  <option key={local.id} value={local.id}>{local.id}: {local.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dishes?.map((dish) => (
              <div key={dish.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-1 flex-col p-5 bg-white relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{dish.name}</h3>
                  <Link href={`/DetalleLocal/${dish.localId}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                    {dish.local.name}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">{dish.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {dish.category || 'Categoría no especificada'}
                    </span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">${dish.price}</span>
                  </div>
                  <span className="text-sm text-gray-500 italic mt-2">
                    Creado el {dish.createdAt?.split('T')[0]} por <UserLink userName={dish.creator.name} userId={dish.creator.id} />
                  </span>
                </div>
              </div>
          ))}
          {(!dishes || dishes.length === 0) && (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-gray-400 font-medium">No se encontraron platos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}