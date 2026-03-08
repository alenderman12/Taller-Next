import { useState, useEffect } from "react";
import { getDishes } from "../api/api";
import Link from "next/link";

const MenuListado = ({localId}) => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const data = await getDishes("", "", "", "", "", localId);
                setDishes(data);
            } catch (error) {
                console.error("Error al cargar los platillos", error);
            }
        };
        fetchDishes();
    }, [localId]);

    if (!dishes || dishes.length === 0) {
        return <p className="text-gray-500 italic">Aún no hay platillos para este local.</p>;
    }

    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dishes.map((dish) => (
                    <Link key={dish.id} href={`/DetallePlato/${dish.id}`} className="group block">
                        <div key={dish.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{dish.description}</p>
                                <span className="mt-2 font-semibold text-indigo-600">${dish.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MenuListado;