import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Button } from "../home/ui2/button";

export default function ProductCard({ product, compact }) {

    return (
        <Card className={`w-full ${compact ? 'max-w-xs rounded-lg py-2' : 'max-w-sm rounded-2xl py-4'} shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <CardHeader className={compact ? 'p-2' : 'p-4'}>
                <div className="relative">
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className={`w-full object-cover rounded-xl ${compact ? 'h-28' : 'h-48'}`}
                    />
                    <Button className={`absolute -bottom-8 right-2 text-xs bg-amber-200 ${compact ? 'w-14 h-8' : 'w-20 h-10'}`}>ADD</Button>
                </div>

            </CardHeader>
            <CardContent className={compact ? 'space-y-1 px-2' : 'space-y-1 px-4'}>
                <CardTitle className={compact ? 'text-base font-semibold' : 'text-lg font-bold'}>{product.name}</CardTitle>
                <p className={compact ? 'text-xs text-muted-foreground' : 'text-sm text-muted-foreground'}>{product.brand}</p>
                <p className={compact ? 'text-xs text-muted-foreground' : 'text-sm text-muted-foreground'}>By {product.vendor_store_id.store_name}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className={compact ? 'bg-blue-100 text-blue-800 text-[10px] font-medium px-2 py-0.5 rounded-lg' : 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg'}>{product.category.name}</span>
                    {
                        product.is_featured &&
                        <span className={compact ? 'bg-green-100 text-green-800 text-[10px] font-medium px-2 py-0.5 rounded-lg' : 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-lg'}>
                            Featured
                        </span>
                    }
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Star className="text-yellow-300 fill-yellow-300" height={compact ? 16 : 20} width={compact ? 16 : 20} />
                    <p className={compact ? 'text-xs font-medium text-muted-foreground' : 'text-sm font-medium text-muted-foreground'}>{product.rating.average} ({product.rating.count})</p>
                </div>
                <p className={compact ? 'text-base font-semibold text-primary' : 'text-lg font-semibold text-primary'}>
                    <span className={compact ? 'text-xs text-muted-foreground font-normal' : 'text-sm text-muted-foreground font-normal'}>MRP </span>
                    ₹100
                </p>

            </CardContent>
        </Card>
    )
}