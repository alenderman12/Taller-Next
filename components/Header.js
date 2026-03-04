import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black text-gray-900 tracking-tight">
            Mi<span className="text-indigo-600">App</span>
          </Link>
        </div>
        <div className="flex gap-x-6 items-center">
          <Link href="/ListadoPrincipal" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Locales
          </Link>
          <Link href="/" className="text-sm font-medium px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            Cerrar Sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}