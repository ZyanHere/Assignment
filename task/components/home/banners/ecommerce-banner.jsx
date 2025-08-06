import { ShoppingBag, Star, Truck, Shield, CreditCard, Users, TrendingUp, Gift } from "lucide-react"

export default function EcommerceBanner() {
  return (
    <div className="w-full max-w-[1700px] mx-auto h-[200px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-12 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-12 gap-4 px-6 py-4">
        {/* Left Section - Brand & Main CTA */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
          <div className="mb-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tight">LMD</h1>
            <p className="text-purple-200 text-sm md:text-base font-semibold">Premium Marketplace</p>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-purple-200 text-xs">4.9 (12k+ reviews)</span>
          </div>

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg w-fit">
            Shop Now - 30% Off
          </button>
        </div>

        {/* Center Section - Product Categories */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center space-y-2">
          <h3 className="text-white font-bold text-sm mb-2 text-center">Popular Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <ShoppingBag className="w-4 h-4 text-purple-300 mx-auto mb-1" />
              <span className="text-white text-xs font-medium">Fashion</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <Gift className="w-4 h-4 text-pink-300 mx-auto mb-1" />
              <span className="text-white text-xs font-medium">Gifts</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <TrendingUp className="w-4 h-4 text-green-300 mx-auto mb-1" />
              <span className="text-white text-xs font-medium">Trending</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <Users className="w-4 h-4 text-blue-300 mx-auto mb-1" />
              <span className="text-white text-xs font-medium">Popular</span>
            </div>
          </div>
        </div>

        {/* Right Section - Features & Stats */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center space-y-3">
          <div className="text-right mb-2">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-purple-200 text-xs">Happy Customers</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2 text-purple-200">
              <span className="text-xs font-medium">Free Shipping</span>
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-purple-200">
              <span className="text-xs font-medium">Secure Payment</span>
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-purple-200">
              <span className="text-xs font-medium">Easy Returns</span>
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg p-2 text-center border border-green-400/30">
            <div className="text-green-300 font-bold text-sm">Flash Sale</div>
            <div className="text-green-200 text-xs">Ends in 2h 15m</div>
          </div>
        </div>
      </div>

      {/* Bottom Promotional Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 h-1"></div>

      {/* Floating Elements */}
      <div className="absolute -top-0.5 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
        SALE
      </div>
      
    </div>
  )
}
