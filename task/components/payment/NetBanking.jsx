const banks = ["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank"];

const NetBanking = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">Select Your Bank</h2>
      <ul>
        {banks.map((bank) => (
          <li key={bank} className="py-2 border-b cursor-pointer hover:bg-gray-100">
            {bank}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NetBanking;
