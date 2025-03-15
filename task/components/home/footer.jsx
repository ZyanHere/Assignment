import Image from "next/image";

const Footer = () => {
  return (
    <div className="p-6">
      <div className="bg-[rgba(246,226,171,0.40)] mt-29 py-[60px] px-16 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-[82px] ">
        <div>
          <h3 className="font-bold text-[22px]">Exclusive</h3>
          <p className="mt-[22px] font-semibold text-[19px]">Subscribe</p>
          <p className="mt-[22px] text-sm text-black">
            Get 10% off your first order
          </p>
          <div className="mt-5 flex items-center border border-black rounded-sm overflow-hidden relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 outline-none bg-transparent pr-10"
            />
            <Image 
              src="/home/footer/icon-send.svg" 
              alt="Arrow Icon" 
              width={20} 
              height={20} 
              className="absolute right-3 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[22px]">Support</h3>
          <p className="text-md text-black mt-[23px] max-w-[180px]">
            111 Bijoy sarani, Dhaka, DH 1515, India.
          </p>
          <p className="text-md text-black mt-[15px]">exclusive@gmail.com</p>
          <p className="text-md text-black mt-[15px]">+88015-88888-9999</p>
        </div>

        <div>
          <h3 className="font-bold text-[22px]">Account</h3>
          <ul className="text-md text-black space-y-3 mt-[23px]">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[22px]">Quick Link</h3>
          <ul className="text-md text-black space-y-3 mt-[23px]">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[22px]">Download App</h3>
          <p className="text-sm text-black mt-[23px]">
            Save $3 with App New User Only
          </p>
          <div className="mt-2 flex cursor-pointer">
            <Image
              src="/home/footer/qrcode.png"
              alt="QR Code"
              width={75}
              height={75}
            />
            <div className="flex-col ml-2 cursor-pointer">
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
          <div className="flex  space-x-8 mt-6 cursor-pointer">
            <Image src="/home/footer/fb.svg" alt="Facebook" width={24} height={24} />
            <Image src="/home/footer/tw.svg" alt="Twitter" width={24} height={24} />
            <Image
              src="/home/footer/ig.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
            <Image
              src="/home/footer/Linkedin.svg"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>


    </div>
    </div>

    
  );
};

export default Footer;
