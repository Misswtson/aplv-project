export default function HomePage() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">APLV Checker</h1>

      <div className="flex flex-col gap-4">
        <a
          href="/scan"
          className="bg-blue-600 text-white p-3 rounded-lg text-center"
        >
          Escanear código
        </a>

        <a
          href="/search"
          className="bg-gray-800 text-white p-3 rounded-lg text-center"
        >
          Buscar producto
        </a>
      </div>
    </main>
  );
}
