import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold">
            MiApp
          </Link>
        </div>
        <div className="flex gap-x-6">
          <Link href="/ListadoPrincipal" className="text-sm font-semibold hover:text-indigo-200 transition">
            Locales
          </Link>
          <Link href="/" className="text-sm font-semibold hover:text-indigo-200 transition">
            Cerrar Sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}