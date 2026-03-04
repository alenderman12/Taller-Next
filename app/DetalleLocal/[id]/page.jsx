'use client'
import { useState, useEffect } from "react";
import { getLocal } from "../../../api/api";
import { useParams, useRouter } from "next/navigation";
import RestaurantRating from "../../../components/RestaurantRating";
import ListadoRating from "../../../components/ListadoRating";
import MenuListado from "../../../components/MenuListado";
import Link from "next/link";
import { Menu } from "@material-tailwind/react";

export default function DetalleLocal() {
    const { id } = useParams();
    const router = useRouter();
    const [local, setLocal] = useState({});
    const [isPosted, setIsPosted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        const fetchLocal = async () => {
            try {
                const data = await getLocal(id);
                setLocal(data);
            } catch (error) {
                console.error("Error al cargar el local", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLocal();
    }, [id, router]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        </div>
    );

    if (!local) return <div className="py-20 text-center">Local no encontrado.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <Link href="/ListadoPrincipal" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <span className="mr-2">←</span> Volver al listado
                </Link>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    
                    <div className="lg:col-span-2 space-y-8">
                        
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="relative h-96 w-full">
                                <img
                                    src={local.photos && local.photos[0] ? local.photos[0] : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"}
                                    alt={local.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                            {local.type}
                                        </span>
                                        <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                                            {local.priceRange}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-black text-white">{local.name}</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
                                <div className="p-6 text-center border-b md:border-b-0 md:border-r border-gray-100">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Ciudad</p>
                                    <p className="text-lg font-semibold text-gray-900">{local.city}</p>
                                </div>
                                <div className="p-6 text-center border-b md:border-b-0 md:border-r border-gray-100">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Zona</p>
                                    <p className="text-lg font-semibold text-gray-900">{local.zone}</p>
                                </div>
                                <div className="p-6 text-center">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Horarios</p>
                                    <p className="text-lg font-semibold text-gray-900">{local.hours || 'No disponible'}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h3>
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-2xl">📍</span>
                                    <p className="text-gray-600 leading-relaxed">{local.address}</p>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-black text-gray-900 mb-6">Menu</h3>
                            <MenuListado localId={id} />
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-black text-gray-900 mb-6">Lo que dicen los clientes</h3>
                            <ListadoRating idLocal={id} />
                        </div>
                    </div>

                    <div className="">
                        <RestaurantRating local={local} setIsPosted={setIsPosted} />
                    </div>

                </div>
            </main>
        </div>
    );
}