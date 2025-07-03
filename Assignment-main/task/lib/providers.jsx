// app/providers.jsx
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/redux/store";

export function Providers({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance once on the client
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}