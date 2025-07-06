import Header from "@/components/home/Header"
import Sidebar from "@/components/home/sidebar"
import OrderHistory from "@/components/profile/OrderHistory"

const OrderPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold">My Orders</h1>
              <p className="text-gray-600 mt-2">Track and manage your orders from multiple vendors</p>
            </div>
            <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
