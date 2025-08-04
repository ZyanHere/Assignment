import { ShoppingCart, Heart, Zap, Award, Clock, Percent, ArrowRight, Package } from "lucide-react"

export default function EcommerceBannerV2() {
  return (
    <div className="w-full max-w-[1240px] mx-auto h-[200px] bg-gradient-to-r from-emerald-50 via-white to-teal-50 relative overflow-hidden border border-gray-100 shadow-lg">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-100/50 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-cyan-100/30 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center px-8">
        {/* Left Section - Brand & Hero Message */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">L</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">LMD</h1>
              <p className="text-emerald-600 font-semibold text-sm">Your Style, Our Passion</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">Summer Collection 2024</h2>
            <p className="text-gray-600 text-sm">Discover premium quality products at unbeatable prices</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Explore Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">40%</div>
              <div className="text-xs text-gray-500 font-medium">OFF</div>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Stats */}
        <div className="hidden lg:flex flex-col items-center justify-center px-8 border-l border-r border-gray-200 h-32">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
              <Package className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">10K+</div>
              <div className="text-xs text-gray-500">Products</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
              <Heart className="w-5 h-5 text-pink-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">25K+</div>
              <div className="text-xs text-gray-500">Reviews</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
              <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">4.8★</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
              <Zap className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">24h</div>
              <div className="text-xs text-gray-500">Delivery</div>
            </div>
          </div>
        </div>

        {/* Right Section - Featured Offers */}
        <div className="flex-1 max-w-sm">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Today's Deals</h3>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  <span className="font-bold">Flash Sale</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>2h left</span>
                </div>
              </div>
              <div className="text-2xl font-black mb-1">UP TO 60% OFF</div>
              <div className="text-sm opacity-90">Electronics & Gadgets</div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-bold">Free Shipping</span>
              </div>
              <div className="text-lg font-bold mb-1">Orders Over $50</div>
              <div className="text-sm opacity-90">No minimum, no hassle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats Bar */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-6 py-2">
        <div className="flex justify-between items-center text-center">
          <div>
            <div className="text-sm font-bold text-gray-800">10K+</div>
            <div className="text-xs text-gray-500">Products</div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">4.8★</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">24h</div>
            <div className="text-xs text-gray-500">Delivery</div>
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-600">Free Ship</div>
            <div className="text-xs text-gray-500">Over ₹5000</div>
          </div>
        </div>
      </div>
    </div>
  )
}
