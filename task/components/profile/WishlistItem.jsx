"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Heart, 
  ShoppingBag, 
  X, 
  Loader2, 
  Eye, 
  Edit3, 
  Star,
  Calendar,
  Tag
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WishlistItem = ({ 
  item, 
  onRemove, 
  onUpdate, 
  onBuyNow, 
  isRemoving = false,
  isUpdating = false 
}) => {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');
  const [priority, setPriority] = useState(item.priority || 'medium');

  const productData = item.product_id || item.product_snapshot;
  const productName = productData?.name || "Product";
  const productImage = productData?.images?.[0]?.url || 
                      productData?.primary_image || 
                      "/products/default.jpg";
  const productBrand = productData?.brand || "Brand";
  const productPrice = productData?.variants?.[0]?.price?.sale_price?.toString() || 
                      productData?.price?.$numberDecimal || "0";
  const originalPrice = productData?.variants?.[0]?.price?.base_price?.toString() || 
                       productData?.price?.$numberDecimal || "0";
  const productId = productData?._id || productData?.id;

  // Calculate discount percentage
  const discountPercentage = originalPrice !== "0" && productPrice !== "0" 
    ? Math.round(((parseFloat(originalPrice) - parseFloat(productPrice)) / parseFloat(originalPrice)) * 100)
    : 0;

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-800', icon: '🔥' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: '⭐' },
    low: { label: 'Low', color: 'bg-green-100 text-green-800', icon: '📝' }
  };

  const handleUpdate = async () => {
    if (onUpdate) {
      await onUpdate(item._id, { notes, priority });
      setIsEditOpen(false);
    }
  };

  const handleViewProduct = () => {
    router.push(`/product/${productId}`);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(productId);
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="text-sm text-gray-500">
                Added {new Date(item.added_at || item.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={priorityConfig[priority]?.color}>
              {priorityConfig[priority]?.icon} {priorityConfig[priority]?.label}
            </Badge>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Wishlist Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this item..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpdate} 
                      disabled={isUpdating}
                      className="flex-1"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Updating...
                        </>
                      ) : (
                        'Update'
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="sm:flex-col flex-row md:flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover rounded-lg border"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{productName}</h3>
                <p className="text-sm text-gray-600">{productBrand}</p>
                {productData?.category?.name && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Tag className="w-3 h-3" />
                    {productData.category.name}
                  </p>
                )}
              </div>
            </div>

            {/* Price Information */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-green-600">₹{productPrice}</span>
              {originalPrice !== productPrice && (
                <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
              )}
            </div>

            {/* Notes Display */}
            {item.notes && (
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-700">{item.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewProduct}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button 
                size="sm" 
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Now
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRemove(productId)}
                disabled={isRemoving}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isRemoving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistItem; 