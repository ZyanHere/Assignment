import Image from "next/image";

const CategoryHeader = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      <h2 className="text-2xl font-semibold">Categories</h2>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100">
          <Image src="/category/icon.svg" alt="Filter" width={20} height={20} />
          Filters
          <Image src="/category/down.svg" alt="Arrow" width={16} height={16} className="ml-5"/>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 ml-4">
          <Image src="/category/icon.svg" alt="Sort" width={20} height={20} />
          Sort
          <Image src="/category/down.svg" alt="Arrow" width={16} height={16} className="ml-5"/>
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
