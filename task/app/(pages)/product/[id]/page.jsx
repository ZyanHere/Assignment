// // app/product/[id]/page.js

// import BrandCarousel from '@/components/home/BrandCarousel';
// import ProductClientSection from './ProductClientSection';
// import Footer from '@/components/home/footer';


// export async function generateMetadata({ params }) {
//   const { data: product } = await fetch(
//     `/api/products/${params.id}/meta`
//   ).then(res => res.json());

//   return {
//     title: `${product?.name || 'Product'} - FreshMarket`,
//     description: product?.description || 'Product details',
//     openGraph: {
//       images: product?.images ? [{ url: product.images[0] }] : [],
//     },
//   };
// }

// export async function generateStaticParams() {
//   const products = await fetch('/api/products/popular').then(res => res.json());
//   return products.map(({ id }) => ({ id }));
// }

// export default function ProductPage({ params }) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <ProductClientSection productId={params.id} />
      
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
//         <BrandCarousel />
//       </div>
      
//       <Footer />
//     </div>
//   );
// }