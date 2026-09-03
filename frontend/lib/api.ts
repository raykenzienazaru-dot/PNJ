import { supabase } from "./supabaseClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path: string) {
  const headers = await authHeader();
  const res = await fetch(`${API_URL}${path}`, { headers });
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}

export async function apiPostJson(path: string, body: unknown) {
  const headers = await authHeader();
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}

export async function apiPostForm(path: string, formData: FormData) {
  const headers = await authHeader();
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}
