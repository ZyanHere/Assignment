import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

const CategoryHeader = ({ category }) => {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.replace("-", " ")}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Filters and Sort Buttons */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100">
          <img src="/category/icon.svg" alt="Filter" width={20} height={20} />
          Filters
          <img src="/category/down.svg" alt="Arrow" width={16} height={16} className="ml-5"/>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 ml-4">
          <img src="/category/icon.svg" alt="Sort" width={20} height={20} />
          Sort
          <img src="/category/down.svg" alt="Arrow" width={16} height={16} className="ml-5"/>
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
