import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/productContext";
import { useState } from "react";



export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const { setSelectedProduct } = useProduct();
    const [imageError, setImageError] = useState(false);

    const handleItemClick = () => {
        setSelectedProduct(product);
        router.push(`/product/${product.id}`);
    }

   
    

    // Get the first variant (base variant) data
    const getVariantData = () => {
        const variant = product?.variants?.[0];
        if (!variant) return null;

        const price = variant?.price?.base_price || variant.base_price || 100;
        const sale_price = variant?.price?.sale_price || variant.sale_price || 0;

        return {
            variant,
            price,
            sale_price,
            stock: variant.stock?.quantity || variant.available_quantity || 0,
            sku: variant.sku || "N/A",
        };
    };

    // Get the primary image or first image from the array
    const getImageUrl = () => {
        if (!product.images || product.images.length === 0 || imageError) {
            return "/placeholder-image.jpg";
        }

        const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
        return primaryImage?.url || "/placeholder-image.jpg";
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // prevent card click
        const data = getVariantData();

        if (data?.variant) {
            addToCart({
                id: data.variant._id,
                variant: data.variant,
                product,
                price: data.price,
                sale_price: data.sale_price,
                stock: data.stock,
                sku: data.sku,
            });
        } else {
            console.warn("No variant available for this product");
        }
    };

    const imageUrl = getImageUrl();
    const variantData = getVariantData();

    const displayPrice =
        variantData?.sale_price > 0 ? variantData.sale_price : variantData?.price || 100;
    const originalPrice = variantData?.sale_price > 0 ? variantData.price : null;

    // Check if we can add to cart (has variant and stock)
    const canAddToCart = variantData?.variant && variantData.stock > 0;


    return (
        <Card
            className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={handleItemClick}
        >
            <CardHeader className="p-4">
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        onError={() => setImageError(true)}
                        className="w-full h-48 object-contain rounded-xl"
                    />
                    <Button
                        className="absolute -bottom-12 right-2 text-xs bg-amber-200 w-20 h-10"
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                    >
                        {canAddToCart ? "ADD" : "OUT OF STOCK"}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-1 px-4">
                <CardTitle className="text-lg font-bold">
                    {variantData?.variant?.variant_name || product.name}
                </CardTitle>

                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="text-sm text-muted-foreground">
                    By {product.vendor_store_id?.store_name || "Unknown Store"}
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                        {product.category?.name || "Uncategorized"}
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

                <div className="mt-2">
                    {originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                            MRP ₹{originalPrice}
                        </p>
                    )}
                    <p className="text-lg font-semibold text-primary">
                        <span className="text-sm text-muted-foreground font-normal">
                            {originalPrice ? "Sale Price" : "MRP"}{" "}
                        </span>
                        ₹{displayPrice}
                    </p>
                </div>

                <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                        Stock: {variantData?.stock > 0 ? `${variantData.stock} available` : "Out of Stock"}
                    </p>
                    <p className="text-xs text-muted-foreground">SKU: {variantData?.sku}</p>
                </div>
            </CardContent>
        </Card>
    );
}