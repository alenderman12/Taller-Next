'use client'
import { useState, useEffect } from "react";
import { getDish } from "../../../api/api";
import { useParams, useRouter } from "next/navigation";
import DishRating from "../../../components/DishRating";
import ListadoRatingPlato from "../../../components/ListadoRatingPlato";
import Link from "next/link";
import { Rating } from "@material-tailwind/react";
import UserLink from "../../../components/UserLink";

export default function DetallePlato() {
    const { id } = useParams();
    const router = useRouter();
    const [dish, setDish] = useState(null);
    const [isPosted, setIsPosted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ratingAverage, setRatingAverage] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        const fetchDish = async () => {
            try {
                const data = await getDish(id);
                if (data.reviews && data.reviews.length > 0) {
                    const ratingSum = data.reviews.reduce((acc, review) => acc + review.rating, 0);
                    setRatingAverage(ratingSum / data.reviews.length);
                }
                setDish(data);
            } catch (error) {
                console.error("Error al cargar el platillo", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDish();
    }, [id, router]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        </div>
    );

    if (!dish) return <div className="py-20 text-center text-gray-500">Platillo no encontrado.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 mb-6">
                <Link href="/ListadoPrincipal" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <span className="mr-2">←</span> Volver al listado
                </Link>
            </div>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
                            
                            <div className="relative h-80 w-full bg-gray-200">
                                <img 
                                    src={dish.photo || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=jpg&q=80&w=1000&auto=format&fit=crop"} 
                                    alt={dish.name} 
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex gap-2 mb-3">
                                        <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                            {dish.category || 'Categoría'}
                                        </span>
                                        <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white tracking-wider">
                                            📍 {dish.city || 'Ciudad'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <h1 className="text-4xl font-black text-white leading-tight">{dish.name}</h1>
                                        <span className="text-3xl font-black text-emerald-400 bg-black/20 px-3 py-1 rounded-xl backdrop-blur-sm">
                                            ${dish.price}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Descripción</h3>
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {dish.description || 'Este platillo no tiene una descripción disponible.'}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                                    <Link 
                                        href={`/DetalleLocal/${dish.localId || dish.local?.id}`} 
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                                    >
                                        {dish.local.name}  (Ver local)
                                    </Link>
                                    
                                    {dish.creator && (
                                        <div className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-5 py-3 text-sm font-medium text-gray-700 border border-gray-100">
                                            <span>Creado por:</span>
                                            <span className="font-bold text-indigo-600">
                                                <UserLink userName={dish.creator.name} userId={dish.creator.id} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                <h3 className="text-2xl font-bold text-gray-900">Reseñas</h3>
                                {dish.reviews?.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Rating value={Math.round(ratingAverage)} readonly />
                                        <span className="text-sm font-medium text-gray-500">
                                            ({ratingAverage.toFixed(1)} de {dish.reviews.length})
                                        </span>
                                    </div>
                                )}
                            </div>
                            <ListadoRatingPlato dishId={id} />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <DishRating dish={dish} setIsPosted={setIsPosted} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}