const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`);

  if (!res.ok) {
    throw new Error(`API GET error: ${res.status}`);
  }

  return res.json();
}
