import Header from "@/components/home/Header"
import OrderHistory from "@/components/profile/OrderHistory"

const OrderPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <div className="p-3 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">My Orders</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Track and manage your orders from multiple vendors
            </p>
          </div>
          <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
