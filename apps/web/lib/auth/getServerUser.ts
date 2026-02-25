import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerUser() {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        cookie: cookies().toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}