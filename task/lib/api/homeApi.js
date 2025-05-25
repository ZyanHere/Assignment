export async function fetchHomeData() {
  try {
    const res = await fetch("http://13.232.240.0:4000/lmd/api/v1/home", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch home data");

    const json = await res.json();
    const data = json?.data || {};

    return {
      flashDeals: data.flashDeals?.items || [],
      products: data.products?.items || [],
    };
  } catch (error) {
    console.error("Home fetch failed:", error.message);
    return {
      flashDeals: [],
      products: [],
    };
  }
}