"use client";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await response.json();
      
      if (result.status === "success") {
        setOrders(result.data?.orders || []);
      } else {
        setError(result.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.order_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders().finally(() => setIsRefreshing(false));
  };

  // Show loading state
  if (loading) {
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

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-muted-foreground">View and manage your past orders</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <ShoppingBag className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-medium">Error loading orders</h3>
          <p className="text-muted-foreground max-w-md">{error}</p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground">View and manage your past orders</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" onValueChange={setFilter}>
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
              customButtons={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                  <Button variant="default" size="sm">
                    Buy Again
                  </Button>
                </div>
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <div className="bg-gray-100 p-4 rounded-full">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium">No orders found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchTerm 
                ? "No orders match your search. Try different keywords."
                : "You haven't placed any orders yet."}
            </p>
            <Button>Continue Shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;