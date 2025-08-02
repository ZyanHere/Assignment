// lib/api.js
export const fetcher = async (url, withCredentials = true) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.lastminutessdeal.com'; // use your real URL

  const fullUrl = `${baseUrl}${url}`;

  const res = await fetch(fullUrl, {
    credentials: withCredentials ? "include" : "same-origin", // or "omit"
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    throw error;
  }

  return res.json();
};
