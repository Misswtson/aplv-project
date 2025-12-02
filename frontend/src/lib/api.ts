const API_URL = "http://localhost:4000";

export async function searchProductByScan(scanCode: string) {
  const res = await fetch(`${API_URL}/products/${scanCode}`);
  if (!res.ok) return null;
  return res.json();
}

export async function searchIngredients(productId: number) {
  const res = await fetch(`${API_URL}/ingredients?productId=${productId}`);
  return res.json();
}
