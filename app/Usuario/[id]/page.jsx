'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUser } from "../../../api/api";
import Link from "next/link";

export default function ListadoPrincipal() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [locals, setLocals] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [pfpName, setPfpName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      setUser(data);
      setLocals(data.locals);
      setDishes(data.dishes);
      setPfpName(data.name?.replaceAll(' ', '+'));
    };
    fetchUser();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Cabecera de Perfil */}
        <div className="flex items-center gap-x-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-indigo-50"
            src={`https://ui-avatars.com/api/?name=${pfpName}&background=random&color=fff&size=128`}
            alt="Foto de perfil"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500 mt-1">Perfil de usuario</p>
          </div>
        </div>

        {/* Sección de Locales */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Locales de {user.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locals?.map((local) => (
              <Link key={local.id} href={`/DetalleLocal/${local.id}`} className="group block h-full">
                <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <img
                    alt={local.name}
                    src={local.photos && local.photos[0] ? local.photos[0] : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&auto=format&fit=crop"}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-5 relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{local.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{local.city} • {local.zone}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        {local.type || 'Local'}
                      </span>
                      <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                        {local.priceRange || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {(!locals || locals.length === 0) && (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No se encontraron locales.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Platillos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Platillos de {user.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dishes?.map((dish) => (
              <div key={dish.id} className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-1 flex-col p-5 relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{dish.name}</h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">{dish.description}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {dish.category || 'Sin categoría'}
                    </span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                      ${dish.price || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {(!dishes || dishes.length === 0) && (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No se encontraron platos.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}