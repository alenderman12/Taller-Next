'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pfpName, setPfpName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedId = localStorage.getItem('id');
    const storedName = localStorage.getItem('name');
    
    setId(storedId);
    setName(storedName);
    setPfpName(storedName?.replaceAll(' ', '+'));
    setIsLoggedIn(!!token);
  }, []);
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black text-gray-900 tracking-tight">
            Mi<span className="text-indigo-600">App</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-x-8 items-center justify-center">
          <Link href="/ListadoPrincipal" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
            Locales
          </Link>
          <Link href="/ListadoPlatos" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
            Platillos
          </Link>
        </div>

        <div className="flex flex-1 justify-end items-center relative">
          {isLoggedIn ? (
          <>
          <div 
            className="flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              className="h-9 w-9 rounded-full object-cover border border-gray-200"
              src={`https://ui-avatars.com/api/?name=${pfpName}&background=random&color=fff`}
              alt="Foto de perfil"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{name}</span>
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Link 
                href={`/Usuario/${id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi Perfil
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = '/';
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
          </>
          ) : (
            <Link href="/" className="text-sm font-semibold px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all hover:shadow">
              Iniciar Sesión
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
}