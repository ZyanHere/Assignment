import Image from "next/image";

const Footer = () => {
  return (
    <div className="p-5">
      <footer className="bg-[#FFF8E1] p-10 relative mt-8">
        <div className="mx-[75px] flex justify-between items-center">
          <div>
            <h2 className="text-[50px] font-bold text-black">Last stop for</h2>
            <p className="text-[30px] font-semibold text-black">GREAT PRICES....</p>
            <Image
              src="/auth-asset/logo.png"
              alt="Last Minutes Deal Logo"
              width={84}
              height={59}
              className="mt-5"
            />
          </div>

          <div className="flex flex-col space-y-4 ">
            {[
              "/footer/yt.png",
              "/footer/tw.svg",
              "/footer/ig.svg",
              "/footer/fb.svg",
            ].map((icon, index) => (
                <div key={index} className="w-14 h-14 bg-white rounded-md flex items-center justify-center shadow-md cursor-pointer">
                <Image src={icon} alt="Social Icon" width={27} height={27}  />
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* <div className="bg-[#48744D] h-[125px] p-6 mt-20 flex items-center justify-center rounded-tl-[50px] rounded-tr-[50px]">
        <div className=" pt-[22px] flex items-center justify-center relative">
          <Image
            src="/footer/circle.svg"
            alt="Circle Icon"
            width={60}
            height={60}
          />
          <span className="absolute text-[#FCCD25] text-2xl font-bold">%</span>
        </div>
        <p className="text-[#FCCD25] pt-[22px] text-[25px] font-bold ml-7">
          Enjoy best deals everyday from nearby store
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
