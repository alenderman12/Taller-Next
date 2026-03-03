import { userAgentFromString } from "next/server";

const URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, name, password) => {
    const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username, name, password})
    })

    const data = await response.json();

    console.log("[INFO : REGISTER]   ", data);
}

const login = async (username, password) => {
    const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username, password})
    })

    const data = await response.json();

    console.log("[INFO : LOGIN]   ", data);
    if(data.token) {
        console.log("asdasddasd");
        localStorage.setItem("token", data.token);
    }
}

const getLocals = async (q="", type="", priceRange="", rating="", city="", zone="") => {
    const response = await fetch(`${URL}/api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
    })

    const data = await response.json();

    return data.items;
}

const addLocal = async (name, type, priceRange, city, zone, address, hours, photos) => {
    const response = await fetch(`${URL}/api/locals`, {
        method: "POST",
        headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify({name, type, priceRange, city, zone, address, hours, photos})
    })

    const data = await response.json();

    console.log("[INFO : ADD LOCAL]   ", data);
}

const getLocal = async (id) => {
    const response = await fetch(`${URL}/api/locals/${id}`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
    })

    const data = await response.json();

    return data.item;
}

const postReview = async (localId, rating, comment) => {
    const response = await fetch(`${URL}/api/locals/${localId}/reviews`, {
        method: "POST",
        headers: {"Content-Type" : "application/json", 'Authorization' : `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify({rating, comment})
    })

    const data = await response.json();

    console.log("[INFO : POST REVIEW]   ", data);
}

export {
    register,
    login,
    getLocals,
    addLocal,
    getLocal,
    postReview
}