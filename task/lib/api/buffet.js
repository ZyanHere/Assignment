




// async function unwrapError(e) {
//   // network error or non-JSON
//   if (!e?.response) throw e;
//   try {
//     const msg = e.response?.data?.message || e.message || "Error";
//     const status = e.response?.status;
//     const error = new Error(msg);
//     error.status = status;
//     throw error;
//   } catch {
//     throw e;
//   }
// }

import { fetcher } from "../api";

export const fetchBuffetData = async () => {
  return fetcher("/lmd/api/v1/retail/home/comprehensive?type=BUFFET&productsLimit=20");
};