import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useState } from "react";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [imageError, setImageError] = useState(false);

    // Get the first variant (base variant) data
    const getVariantData = () => {
        if (!product.variants || product.variants.length === 0) {
            return {
                price: product.price?.base_price || 100,
                sale_price: product.price?.sale_price || 0,
                stock: product.stock?.quantity || 0,
                sku: product.sku || 'N/A',
                variant: null
            };
        }
        
        const firstVariant = product.variants[0];
        
        // Handle price object structure
        let price = 100;
        let sale_price = 0;
        
        if (firstVariant.price && typeof firstVariant.price === 'object') {
            // Price is an object with base_price, sale_price, discount_percentage
            price = firstVariant.price.base_price || 100;
            sale_price = firstVariant.price.sale_price || 0;
        } else {
            // Price is a direct number
            price = firstVariant.price || firstVariant.base_price || 100;
            sale_price = firstVariant.sale_price || 0;
        }
        
        return {
            price: price,
            sale_price: sale_price,
            stock: firstVariant.stock?.quantity || firstVariant.available_quantity || 0,
            sku: firstVariant.sku || 'N/A',
            variant: firstVariant
        };
    };

    // Get the primary image or first image from the array
    const getImageUrl = () => {
        if (!product.images || product.images.length === 0) {
            return '/placeholder-image.jpg'; // Fallback image
        }

        // Find primary image or use first image
        const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
        return primaryImage?.url || '/placeholder-image.jpg';
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleAddToCart = () => {
        const variantData = getVariantData();
        
        if (variantData.variant) {
            // Pass the variant ID to the cart context
            // The cart context expects an object with an 'id' property that contains the variant ID
            addToCart({
                id: variantData.variant._id, // This is what the cart API expects
                variant: variantData.variant,
                product: product,
                price: variantData.price,
                sale_price: variantData.sale_price,
                stock: variantData.stock,
                sku: variantData.sku
            });
        } else {
            // Fallback: add product without variant (though this might not work properly)
            console.warn('No variant available for this product');
        }
    };

    const imageUrl = getImageUrl();
    const variantData = getVariantData();

    // Calculate display price (sale price if available, otherwise base price)
    const displayPrice = variantData.sale_price > 0 ? variantData.sale_price : variantData.price;
    const originalPrice = variantData.sale_price > 0 ? variantData.price : null;

    // Check if we can add to cart (has variant and stock)
    const canAddToCart = variantData.variant && variantData.stock > 0;

    return (
        <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className='p-4'>
                <div className="relative">
                    <img
                        src={imageError ? '/placeholder-image.jpg' : imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-xl"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <Button
                        className={`absolute -bottom-10 right-2 text-xs w-20 h-10 ${
                            canAddToCart 
                                ? 'bg-amber-200 hover:bg-amber-300' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}>
                        {canAddToCart ? 'ADD' : 'OUT OF STOCK'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-1 px-4">
                <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="text-sm text-muted-foreground">
                    By {product.vendor_store_id?.store_name || 'Unknown Store'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                        {product.category?.name || 'Uncategorized'}
                    </span>
                    {product.is_featured && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                            Featured
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Star className="text-yellow-300 fill-yellow-300" height={20} width={20} />
                    <p className="text-sm font-medium text-muted-foreground">
                        {product.rating?.average || 0} ({product.rating?.count || 0})
                    </p>
                </div>
                
                {/* Price Display */}
                <div className="mt-2">
                    {originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                            MRP ₹{originalPrice}
                        </p>
                    )}
                    <p className="text-lg font-semibold text-primary">
                        <span className="text-sm text-muted-foreground font-normal">
                            {originalPrice ? 'Sale Price' : 'MRP'} 
                        </span>
                        ₹{displayPrice}
                    </p>
                </div>

                {/* Stock Status */}
                <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                        Stock: {variantData.stock > 0 ? `${variantData.stock} available` : 'Out of Stock'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        SKU: {variantData.sku}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}