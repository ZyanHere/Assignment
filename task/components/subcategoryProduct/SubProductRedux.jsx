import ProductCard from "./ProductCard"

export default function SubProductRedux({ product }) {
  if (!product) {
    return (
      <div className="animate-pulse">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 sm:h-56 rounded-xl mb-4"></div>
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded"></div>
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded w-3/4"></div>
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-3 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  // Process images to handle S3 URLs with spaces
  const processedProduct = {
    ...product,
    images: Array.isArray(product.images)
      ? product.images.map((img) => ({
          ...img,
          url: encodeURI(img.url),
        }))
      : product.images,
  }

  return (
    <div className="w-full">
      <ProductCard product={processedProduct} />
    </div>
  )
}
