import Image from "next/image";

export const BannerHeader = () => (
  <div className="flex items-center gap-2 text-base font-semibold mb-4">
    <span className="text-black">ST Joseph Indian Composite</span>
    <Image
      src="/home/assets/Down.svg"
      alt="Down Arrow"
      width={20}
      height={20}
      className="object-contain"
    />
  </div>
);