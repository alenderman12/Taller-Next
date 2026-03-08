import { Rating } from "@material-tailwind/react";
import { getLocalReviews } from "../api/api";
import { useState, useEffect } from "react";

const ListadoRating = ({localId}) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getLocalReviews(localId);
                setReviews(data);
            } catch (error) {
                console.error("Error al cargar las reseñas", error);
            }
        };
        fetchReviews();
    }, [localId]);

    if (!reviews || reviews.length === 0) {
        return <p className="text-gray-500 italic">Aún no hay reseñas para este local.</p>;
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                {reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all hover:bg-white hover:shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                alt="Avatar de usuario"
                                src={"https://images.icon-icons.com/1863/PNG/512/person_118819.png"}
                                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{review.user.name || "Usuario Anónimo"}</p>
                                <div className="mt-1">
                                    <Rating value={review.rating} readonly className="flex gap-1" />
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed italic">
                            "{review.comment}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListadoRating;