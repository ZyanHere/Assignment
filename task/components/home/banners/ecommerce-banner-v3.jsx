import { ShoppingBag, Star, Truck, Shield, Users, TrendingUp, Gift, Sparkles, Target, Crown, Flame } from "lucide-react"

export default function EcommerceBannerV3() {
  return (
    <div className="w-full max-w-[1240px] mx-auto h-[200px] bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 relative overflow-hidden shadow-2xl">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Shapes */}
        <div className="absolute top-4 left-8 w-6 h-6 bg-yellow-300/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-12 right-16 w-4 h-4 bg-white/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 left-1/4 w-8 h-8 bg-orange-300/20 rotate-12"></div>
        <div className="absolute bottom-4 right-8 w-5 h-5 bg-pink-300/30 rounded-full"></div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10 h-1/2 flex items-center justify-between px-8 py-2">
        {/* Brand Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <span className="text-white font-black text-2xl">LMD</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">LMD STORE</h1>
              <p className="text-orange-100 font-semibold text-sm">Where Dreams Meet Reality</p>
            </div>
          </div>

          {/* Quick Features */}
          <div className="hidden md:flex items-center gap-4 ml-8">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Premium</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-white text-sm font-medium">Trending</span>
            </div>
          </div>
        </div>

        {/* Right Side Stats */}
        {/* <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-black text-white">75%</div>
            <div className="text-orange-100 text-sm font-medium">OFF Today</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">100K+</div>
            <div className="text-orange-100 text-sm font-medium">Sold</div>
          </div>
        </div> */}
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 h-1/2 px-8 py-2">
        <div className="h-full flex items-center justify-between">
          {/* Left - Main CTA */}
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">MEGA SALE EVENT</h2>
              <p className="text-orange-100 text-sm mb-3">Limited time offer - Don't miss out!</p>
              <button className="bg-white hover:bg-gray-100 text-red-500 px-6 py-2 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                SHOP NOW
              </button>
            </div>

            {/* Feature Pills */}
            <div className="hidden lg:flex flex-col gap-2">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-white">
                  <Truck className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium">Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-pink-300" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Product Categories */}
          <div className="hidden md:block mb-20">
            <h3 className="text-white font-bold text-sm mb-3 text-center">Hot Categories</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <ShoppingBag className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Fashion</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <Gift className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Gifts</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <TrendingUp className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Tech</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <Star className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Beauty</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <Crown className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Luxury</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center hover:bg-white/30 transition-all cursor-pointer border border-white/20 group">
                <Flame className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-white text-xs font-medium">Sale</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 animate-pulse"></div>

      {/* Corner Badges */}
      <div className="absolute top-2 right-2 bg-yellow-400 text-red-600 text-xs px-2 py-1 rounded-full font-black animate-bounce">
        HOT!
      </div>
      {/* <div className="absolute bottom-2 left-2 bg-green-400 text-white text-xs px-2 py-1 rounded-full font-bold">
        TRUSTED
      </div> */}
    </div>
  )
}
