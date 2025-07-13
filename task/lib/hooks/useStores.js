import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { fetchVendors, fetchVendorProducts } from "@/lib/redux/stores/storesSlice";

export const useStores = () => {
  const dispatch = useDispatch();
  const storesState = useSelector((state) => state.stores);

  const actions = {
    fetchVendors: useCallback(() => dispatch(fetchVendors()), [dispatch]),
    fetchVendorProducts: useCallback((vendorId) => dispatch(fetchVendorProducts(vendorId)), [dispatch]),
  };

  return {
    ...storesState,
    ...actions,
  };
}; 