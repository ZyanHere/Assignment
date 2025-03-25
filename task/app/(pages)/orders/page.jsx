import Header from "@/components/home/Header"
import Sidebar from "@/components/home/sidebar"
import OrderHistory from "@/components/profile/OrderHistory"

const OrderPage = () => {
  return (
    <div className="flex">
        <Sidebar/>
      <div className="flex-1">
        <Header />
        <div className="p-6">
            <p className="text-3xl mb-6 font-semibold">Orders</p>
            <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
