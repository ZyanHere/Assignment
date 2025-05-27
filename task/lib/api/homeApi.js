export async function fetchHomeData() {
  try {
    const res = await fetch("/api/home", { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch");

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