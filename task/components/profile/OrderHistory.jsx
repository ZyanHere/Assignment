"use client";
import OrderCard from "./OrderCard";
import OrderTrackingModal from "./OrderTrackingModal";
import { Search, Filter, RefreshCw, ShoppingBag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { 
  fetchUserOrders, 
  fetchOrderTracking, 
  refreshOrderTracking,
  setOrderTracking,
  clearOrderTracking 
} from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { 
    orders, 
    ordersLoading, 
    ordersError, 
    orderTracking,
    trackingLoading,
    trackingError,
    isAuthenticated, 
    session 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Memoize filtered orders to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) {
      return [];
    }
    return orders.filter(order => {
      const matchesSearch = order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleTrackOrder = async (order) => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    // Debug: Log the order object to see its structure
    console.log('Order object:', order);
    console.log('Order ID:', order.order_id);
    console.log('Order ID (id):', order.id);
    console.log('All order properties:', Object.keys(order));

    setSelectedOrder(order);
    setTrackingModalOpen(true);

    try {
      // Fetch tracking data for the order using Redux
      const orderId = order.order_id;
      if (!orderId) {
        throw new Error('Order ID not found');
      }
      
      await dispatch(fetchOrderTracking({ 
        token: session.user.token, 
        orderId 
      })).unwrap();
      
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      toast.error(error || 'Failed to load tracking information');
      setTrackingModalOpen(false);
    }
  };

  const handleRefreshTracking = async () => {
    if (!selectedOrder || !session?.user?.token) return;

    try {
      await dispatch(refreshOrderTracking({ 
        token: session.user.token, 
        orderId: selectedOrder.order_id 
      })).unwrap();
      
      toast.success('Tracking information updated');
    } catch (error) {
      console.error('Error refreshing tracking data:', error);
      toast.error(error || 'Failed to refresh tracking information');
    }
  };

  const closeTrackingModal = () => {
    setTrackingModalOpen(false);
    setSelectedOrder(null);
    // Clear tracking data for this order when modal is closed
    if (selectedOrder?.order_id) {
      dispatch(clearOrderTracking(selectedOrder.order_id));
    }
  };

  // Get tracking data for the selected order
  const getTrackingData = () => {
    if (!selectedOrder?.order_id) return null;
    return orderTracking[selectedOrder.order_id] || null;
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
          <button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Retry
          </button>
        </div>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to Load Orders</h3>
            <p className="text-sm">{ordersError}</p>
          </div>
          <button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Try Again
          </button>
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
        
        <button 
          onClick={handleRefresh} 
          disabled={isRefreshing || ordersLoading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search by order number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { value: 'all', label: 'All' },
            { value: 'completed', label: 'Completed' },
            { value: 'pending', label: 'Pending' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.value
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            // Debug: Log the raw order data
            console.log('Raw order data:', order);
            console.log('Raw order order_id:', order.order_id);
            console.log('Raw order _id:', order._id);
            return (
            <OrderCard 
              key={order._id || order.order_id} 
              order={{
                id: order.order_number || order.order_id,
                order_id: order.order_id, // Add this line to include the order_id
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
                  actionLabel: order.status === "delivered" ? "Review" : "Review" // change second to Track when there's the API for it
                })) || []
              }}
              onTrackOrder={handleTrackOrder}
            />
          );
          })
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <a 
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingModalOpen}
        onClose={closeTrackingModal}
        order={selectedOrder}
        trackingData={getTrackingData()}
        onRefresh={handleRefreshTracking}
        trackingLoading={trackingLoading}
      />

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