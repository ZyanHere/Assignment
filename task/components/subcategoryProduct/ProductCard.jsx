import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Button } from "../home/ui2/button";

export default function ProductCard({ product }) {

    return (
        <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className='p-4'>
                <div className="relative">
                    <img
                        src={product.images.url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <Button className='absolute -bottom-10 right-2 text-xs bg-amber-200 w-20 h-10'>ADD</Button>
                </div>

            </CardHeader>
            <CardContent className="space-y-1 px-4">
                <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="text-sm text-muted-foreground">By {product.vendor_store_id.store_name}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg">{product.category.name}</span>
                    {
                        product.is_featured &&
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                            Featured
                        </span>
                    }
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Star className="text-yellow-300 fill-yellow-300" height={20} width={20} />
                    <p className="text-sm font-medium text-muted-foreground">{product.rating.average} ({product.rating.count})</p>
                </div>
                <p className="text-lg font-semibold text-primary">
                    <span className="text-sm text-muted-foreground font-normal">MRP </span>
                    ₹100
                </p>

            </CardContent>
        </Card>
    )
}