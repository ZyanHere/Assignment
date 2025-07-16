import Image from "next/image";


const Footer = () => {
  return (
    <div className="p-6">
      <div className="bg-[rgba(246,226,171,0.40)] mt-10 py-10 px-4 sm:px-8 md:px-16">
        <div className="flex flex-wrap gap-y-10 gap-x-10 lg:justify-evenly">
         
          <div>
            <h3 className="font-bold text-[22px]">Exclusive</h3>
            <p className="mt-6 font-semibold text-[19px]">Subscribe</p>
            <p className="mt-4 text-sm text-black">
              Get 10% off your first order
            </p>
            <div className="mt-4 flex items-center border border-black rounded-md relative w-full max-w-sm md:max-w-md lg:max-w-2xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 py-2  text-sm outline-none bg-transparent placeholder:text-sm"
              />
              <button className="absolute right-2">
                <Image
                  src="/home/footer/icon-send.svg"
                  alt="Send Icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>


         
          <div>
            <h3 className="font-bold text-[22px]">Support</h3>
            <p className="text-sm text-black mt-6 max-w-[200px]">
              111 Bijoy sarani, Dhaka, DH 1515, India.
            </p>
            <p className="text-sm text-black mt-3">exclusive@gmail.com</p>
            <p className="text-sm text-black mt-3">+88015-88888-9999</p>
          </div>




          <div>
            <h3 className="font-bold text-[22px]">Account</h3>
            <ul className="text-sm text-black space-y-3 mt-6">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-[22px]">Quick Link</h3>
            <ul className="text-sm text-black space-y-3 mt-6">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>




          <div>
            <h3 className="font-bold text-[22px]">Download App</h3>
            <p className="text-sm text-black mt-6">
              Save $3 with App New User Only
            </p>
            <div className="mt-3 flex items-start space-x-3">
              <Image
                src="/home/footer/qrcode.png"
                alt="QR Code"
                width={75}
                height={75}
              />
              <div className="flex flex-col space-y-2">
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
            <div className="flex space-x-5 mt-6">
              <Image src="/home/footer/fb.svg" alt="Facebook" width={24} height={24} />
              <Image src="/home/footer/tw.svg" alt="Twitter" width={24} height={24} />
              <Image src="/home/footer/ig.svg" alt="Instagram" width={24} height={24} />
              <Image src="/home/footer/Linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Footer;


