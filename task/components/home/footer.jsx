import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[rgba(246,226,171,0.40)] py-10 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-[82px]">
          {/* Exclusive/Subscribe */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl">Exclusive</h3>
            <p className="mt-6 font-semibold text-base sm:text-lg">Subscribe</p>
            <p className="mt-4 text-sm text-black">Get 10% off your first order</p>
            <form className="mt-4 flex items-center border border-black rounded-sm overflow-hidden relative max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 outline-none bg-transparent pr-10 text-sm sm:text-base"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Image 
                  src="/home/footer/icon-send.svg" 
                  alt="Send Icon" 
                  width={20} 
                  height={20} 
                />
              </button>
            </form>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl">Support</h3>
            <p className="text-sm sm:text-base text-black mt-6 max-w-[180px]">111 Bijoy sarani, Dhaka, DH 1515, India.</p>
            <p className="text-sm sm:text-base text-black mt-4">exclusive@gmail.com</p>
            <p className="text-sm sm:text-base text-black mt-4">+88015-88888-9999</p>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl">Account</h3>
            <ul className="text-sm sm:text-base text-black space-y-3 mt-6">
              <li><Link href="/profile" className="hover:underline hover:text-yellow-600 transition-colors">My Account</Link></li>
              <li><Link href="/login" className="hover:underline hover:text-yellow-600 transition-colors">Login / Register</Link></li>
              <li><Link href="/cart" className="hover:underline hover:text-yellow-600 transition-colors">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:underline hover:text-yellow-600 transition-colors">Wishlist</Link></li>
              <li><Link href="/categories" className="hover:underline hover:text-yellow-600 transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl">Quick Link</h3>
            <ul className="text-sm sm:text-base text-black space-y-3 mt-6">
              <li><a href="/terms" className="hover:underline">Terms Of Use</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl">Download App</h3>
            <p className="text-sm text-black mt-6">Save $3 with App New User Only</p>
            <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Image
                src="/home/footer/qrcode.png"
                alt="QR Code"
                width={75}
                height={75}
                className="mb-2 sm:mb-0"
              />
              <div className="flex flex-col gap-2 ml-0 sm:ml-2">
                <Image
                  src="/home/footer/playStore.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
                <Image
                  src="/home/footer/appstore.png"
                  alt="App Store"
                  width={120}
                  height={40}
                />
              </div>
            </div>
            <div className="flex space-x-6 mt-6">
              <Image src="/home/footer/fb.svg" alt="Facebook" width={24} height={24} />
              <Image src="/home/footer/tw.svg" alt="Twitter" width={24} height={24} />
              <Image src="/home/footer/ig.svg" alt="Instagram" width={24} height={24} />
              <Image src="/home/footer/Linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} Exclusive. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
