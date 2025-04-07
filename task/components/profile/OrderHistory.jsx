"use client";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw } from "lucide-react";

const OrderHistory = () => {
  // Sample order data
  const orders = [
    {
      id: "ORD-2023-001",
      storeName: "TechGadgets",
      status: "completed",
      date: "2023-10-15",
      total: "$249.99",
      items: [
        {
          product: "Wireless Earbuds",
          productImage: "/products/earbuds.jpg",
          brand: "SoundPro",
          quantity: 1,
          price: "129.99",
          status: "Delivered",
          actionLabel: "Reorder"
        },
        {
          product: "Phone Case",
          productImage: "/products/case.jpg",
          brand: "ArmorShield",
          quantity: 2,
          price: "59.99",
          status: "Delivered",
          actionLabel: "Review"
        }
      ]
    },
    // More sample orders...
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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
              key={order.id} 
              order={order} 
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