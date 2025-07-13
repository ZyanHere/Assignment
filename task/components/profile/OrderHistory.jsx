"use client";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, ShoppingBag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchUserOrders } from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { 
    orders, 
    ordersLoading, 
    ordersError, 
    isAuthenticated, 
    session 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Memoize filtered orders to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) {
      return [];
    }
    return orders.filter(order => {
      const matchesSearch = order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.order_id?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || order.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, filter]);

  const handleRefresh = async () => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    setIsRefreshing(true);
    try {
      await dispatch(fetchUserOrders({ token: session.user.token })).unwrap();
      toast.success("Orders refreshed successfully");
    } catch (error) {
      console.error('Failed to refresh orders:', error);
      toast.error(error || 'Failed to refresh orders');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Show authentication required state
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
        <p className="text-gray-500">Please log in to view your orders</p>
      </div>
    );
  }

  // Show error state
  if (ordersError && !ordersLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-muted-foreground">View and manage your past orders</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        </div>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to Load Orders</h3>
            <p className="text-sm">{ordersError}</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (ordersLoading && orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-muted-foreground">View and manage your past orders</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>Loading orders...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground">View and manage your past orders</p>
        </div>
        
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing || ordersLoading} 
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by order number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard 
              key={order._id || order.order_id} 
              order={{
                id: order.order_number || order.order_id,
                storeName: order.vendor_orders?.[0]?.vendor_store_id?.store_name || "Last Minute Deal",
                status: order.status,
                date: new Date(order.created_at || order.createdAt).toLocaleDateString(),
                total: `₹${order.total_amount || 0}`,
                vendorOrders: order.vendor_orders || [],
                isMultiVendor: (order.vendor_orders || []).length > 1,
                items: order.items?.map(item => ({
                  product: item.product_name || item.name,
                  productImage: item.product_image?.url || item.product_image || "/placeholder-product.jpg",
                  brand: item.brand || "LMD",
                  quantity: item.quantity,
                  price: item.unit_price || item.price,
                  totalPrice: item.final_price || (item.unit_price * item.quantity),
                  status: item.status || order.status,
                  vendorStoreName: item.vendor_store_name,
                  vendorOrderId: item.vendor_order_id,
                  actionLabel: order.status === "delivered" ? "Review" : "Track"
                })) || []
              }}
            />
          ))
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Button asChild>
              <a href="/">Start Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Show subtle loading indicator during refresh */}
      {(isRefreshing || ordersLoading) && orders.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg px-4 py-2 border">
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Updating orders...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;