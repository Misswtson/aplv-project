export async function searchProduct(code: string) {
  const res = await fetch(`http://localhost:4000/api/search?code=${code}`);

  if (!res.ok) throw new Error("Error en la API");

  return res.json();
}

