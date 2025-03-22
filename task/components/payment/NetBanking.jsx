import Image from "next/image";

const popularBanks = [
  { name: "ICICI", logo: "/banks/icici.png" },
  { name: "Kotak", logo: "/banks/kotak.png" },
  { name: "SBI", logo: "/banks/sbi.png" },
  { name: "Axis", logo: "/banks/axis.png" },
  { name: "HDFC", logo: "/banks/hdfc.png" },
];

const modeBanks = [
  { name: "Canara Bank", logo: "/banks/canara.png" },
  { name: "Bank of India", logo: "/banks/boi.png" },
  { name: "Bank of Baroda", logo: "/banks/bob.png" },
  { name: "Axis Corporate Net Banking", logo: "/banks/axis.png" },
  { name: "Bank of Maharashtra", logo: "/banks/maharashtra.png" },
  { name: "Catholic Syrian Bank", logo: "/banks/csb.png" },
  { name: "Allahabad Bank", logo: "/banks/allahabad.png" },
  { name: "Central Bank of India", logo: "/banks/cbi.png" },
  { name: "City Union Bank", logo: "/banks/cub.png" },
  { name: "Bank of Baroda - Corporate Banking", logo: "/banks/bob.png" },
];

const NetBanking = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-md mt-10">
      {/* Popular Banks */}
      <h2 className="text-lg font-semibold mb-3">Popular Banks</h2>
      <div className="grid grid-cols-5 gap-3 mb-6 shadow-lg">
        {popularBanks.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center p-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            <Image
              src={bank.logo}
              alt={bank.name}
              width={135}
              height={130}
              className="aspect-[27/26]"
            />
            <p className="text-sm text-center mt-1">{bank.name}</p>
          </div>
        ))}
      </div>

      {/* Select Mode Bank */}
      <h2 className="text-lg font-semibold mb-3">Select Mode Bank</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {modeBanks.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center p-3 border shadow-lg rounded-md cursor-pointer hover:bg-gray-100"
          >
            <Image
              src={bank.logo}
              alt={bank.name}
              width={135}
              height={130}
              className="aspect-[27/26]"
            />
            <p className="text-sm text-center mt-1">{bank.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetBanking;
