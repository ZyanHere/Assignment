// /components/home/foursec/BuffetVariantCard.jsx
"use client";

import Image from "next/image";

export default function BuffetVariantCard({
  id,
  name,
  image,
  base_price,
  sale_price,
  discount_percentage,
  available_quantity,
  is_low_stock,
  attributes,
  onAddToCart,
}) {
  const fmt = (n) =>
    n != null ? `₹${Number(n).toLocaleString("en-IN")}` : "—";
  const showDiscount =
    discount_percentage != null && discount_percentage > 0;

  return (
    <div className="group relative border rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white">
      {/* Image */}
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-md bg-gray-50">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5em]">
        {name}
      </h3>

      {/* Price */}
      <div className="mt-1 flex items-baseline gap-2">
        {sale_price != null ? (
          <>
            <span className="text-lg font-bold text-black">
              {fmt(sale_price)}
            </span>
            {base_price != null && base_price > sale_price && (
              <span className="text-sm text-gray-400 line-through">
                {fmt(base_price)}
              </span>
            )}
            {showDiscount && (
              <span className="text-xs font-semibold text-green-600">
                {discount_percentage}% OFF
              </span>
            )}
          </>
        ) : (
          <span className="text-lg font-bold text-black">
            {fmt(base_price)}
          </span>
        )}
      </div>

      {/* Stock */}
      {available_quantity != null && (
        <p
          className={[
            "mt-1 text-xs",
            is_low_stock ? "text-red-600" : "text-gray-500",
          ].join(" ")}
        >
          {is_low_stock
            ? `Hurry! Only ${available_quantity} left`
            : `${available_quantity} in stock`}
        </p>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={() => onAddToCart?.(id)}
        className="mt-3 w-full rounded-md border border-yellow-500 text-yellow-600 text-sm font-semibold py-1.5 hover:bg-yellow-50"
      >
        Add
      </button>
    </div>
  );
}
