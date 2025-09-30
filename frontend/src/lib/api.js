export async function safeFetch(input, init) {
  const res = await fetch(input, init);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (_) { /* not json */ }
  if (!res.ok) {
    const message = data?.error || text || `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return data ?? {};
}


