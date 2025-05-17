'use client';

import useSWR from 'swr';
import { useState } from 'react';
import CountdownTimer from './CountdownTimer';

const fetcher = url => fetch(url).then(res => res.json());

export default function ProductClientSection({ productId }) {
  const { data: product, error } = useSWR(
    `/api/products/${productId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  );

  const [selectedWeight, setSelectedWeight] = useState(null);

  if (error) return <div>Failed to load product</div>;
  if (!product) return <LoadingSkeleton />;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="flex gap-2">
          {product.images.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} thumbnail ${i + 1}`}
              className="w-16 h-16 object-cover rounded-md border"
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">¥{product.price}</span>
          <span className="text-gray-500 line-through">¥{product.originalPrice}</span>
        </div>

        <CountdownTimer endTime={product.countdownEnd} />

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews} Customer Reviews)
          </span>
        </div>

        <p className="text-gray-600">{product.description}</p>

        <div className="space-y-3">
          <h3 className="font-medium">SELECT WEIGHT</h3>
          <div className="flex flex-wrap gap-2">
            {product.weights.map(weight => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-2 border rounded-md ${
                  selectedWeight === weight
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <div>
            <p className="text-sm text-gray-600">Total price</p>
            <p className="text-2xl font-bold">
              ¥{(product.price * getMultiplier(selectedWeight || product.weights[0])).toFixed(2)}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-yellow-500 text-white rounded-md">
              ADD TO CART
            </button>
            <button className="px-8 py-3 bg-green-600 text-white rounded-md">
              GRAB IT NOW
            </button>
          </div>
        </div>

        {/* Key Information Table */}
        <div className="mt-8 border rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 bg-gray-50 font-medium w-1/4">Type</td>
                <td className="px-6 py-4">{product.type}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 bg-gray-50 font-medium">Unit</td>
                <td className="px-6 py-4">{product.unit}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 bg-gray-50 font-medium">Description</td>
                <td className="px-6 py-4">{product.fullDescription}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">Fssai License</td>
                <td className="px-6 py-4">{product.license}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 animate-pulse">
      <div className="space-y-4">
        <div className="bg-gray-200 h-96 rounded-lg"></div>
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

function getMultiplier(weight) {
  const weights = { '250g': 1, '500g': 2, '1kg': 4, '2kg': 8 };
  return weights[weight] || 1;
}