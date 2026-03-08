import { userAgentFromString } from "next/server";

const URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, name, password) => {
    try {
        const response = await fetch(`${URL}/api/auth/register`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username, name, password})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : REGISTER]   ", data);
        
        if(data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("id", data.user.id);
        }
        return true;
    } catch (error) {
        console.error("Error en register:", error);
        return false;
    }
}

const login = async (username, password) => {
    try {
        const response = await fetch(`${URL}/api/auth/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username, password})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : LOGIN]   ", data);
        
        if(data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("id", data.user.id);
        }
        return true;
    } catch (error) {
        console.error("Error en login:", error);
        return false;
    }
}

const getLocals = async (q="", type="", priceRange="", rating="", city="", zone="") => {
    try {
        const response = await fetch(`${URL}/api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error en getLocals:", error);
        return [];
    }
}

const addLocal = async (name, type, priceRange, city, zone, address, hours, photos) => {
    try {
        const response = await fetch(`${URL}/api/locals`, {
            method: "POST",
            headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({name, type, priceRange, city, zone, address, hours, photos})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : ADD LOCAL]   ", data);
    } catch (error) {
        console.error("Error en addLocal:", error);
    }
}

const getLocal = async (id) => {
    try {
        const response = await fetch(`${URL}/api/locals/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        return data.item;
    } catch (error) {
        console.error("Error en getLocal:", error);
        return null;
    }
}

const getDishes = async (q="", category="", dateFrom="", dateTo="", city="", localId="") => {
    try {
        const response = await fetch(`${URL}/api/dishes?q=${q}&category=${category}&dateFrom=${dateFrom}&dateTo=${dateTo}&city=${city}&localId=${localId}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error en getDishes:", error);
        return [];
    }
}

const addDish = async (name, category, localId, city, price, description) => {
    try {
        const response = await fetch(`${URL}/api/dishes`, {
            method: "POST",
            headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({name, category, localId, city, price, description})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : ADD DISH]   ", data);
    } catch (error) {
        console.error("Error en addDish:", error);
    }
}

const getDish = async (id) => {
    try {
        const response = await fetch(`${URL}/api/dishes/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        return data.item;
    } catch (error) {
        console.error("Error en getDish:", error);
        return null;
    }
}

const postLocalReview = async (localId, rating, comment) => {
    try {
        const response = await fetch(`${URL}/api/locals/${localId}/reviews`, {
            method: "POST",
            headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({rating, comment})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : POST LOCAL REVIEW]   ", data);
    } catch (error) {
        console.error("Error en postLocalReview:", error);
    }
}

const postDishReview = async (dishId, rating, comment) => {
    try {
        const response = await fetch(`${URL}/api/dishes/${dishId}/reviews`, {
            method: "POST",
            headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({rating, comment})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : POST DISH REVIEW]   ", data);
    } catch (error) {
        console.error("Error en postDishReview:", error);
    }
}

const getLocalReviews = async (id) => {
    try {
        const response = await fetch(`${URL}/api/locals/${id}/reviews`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : GET LOCAL REVIEWS]   ", data);
        return data.items;
    } catch (error) {
        console.error("Error en getLocalReviews:", error);
        return [];
    }
}

const getDishReviews = async (id) => {
    try {
        const response = await fetch(`${URL}/api/dishes/${id}/reviews`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : GET DISH REVIEWS]   ", data);
        return data.items;
    } catch (error) {
        console.error("Error en getDishReviews:", error);
        return [];
    }
}

const getUser = async (id) => {
    try {
        const response = await fetch(`${URL}/api/users/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("[INFO : GET USER]   ", data);
        return data.item;
    } catch (error) {
        console.error("Error en getUser:", error);
        return null;
    }
}

export {
    register,
    login,
    getLocals,
    addLocal,
    getLocal,
    getDishes,
    addDish,
    getDish,
    postLocalReview,
    postDishReview,
    getLocalReviews,
    getDishReviews,
    getUser
}