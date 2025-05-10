export const fetcher = async (url) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API base URL is not defined in environment variables");
  }

  const fullUrl = `${baseUrl}${url}`;

  const res = await fetch(fullUrl, {
    credentials: "include", // Optional: if using cookie auth
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Optional: if using JWT
    },
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    throw error;
  }

  return res.json();
};
