import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import Image from "next/image";


export default function OrderCard({ order, customButtons = <></> }) {
  const { storeName, status, items } = order;

  // Determine status label dynamically.
  const statusLabel =
    status === "pending"
      ? "Pending Order"
      : status === "completed"
      ? "Complete Order"
      : "Unknown Status";

  return (
    <div className="border rounded-lg p-4 relative bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image
            src="/home/sidebar/stores.png"
            alt="Store Icon"
            width={20}
            height={20}
          />
          <h2 className="font-semibold text-lg">{storeName}</h2>
        </div>
        <span
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full",
            status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          )}
        >
          {statusLabel}
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-2 w-[30%] min-w-[180px]">
                Product
              </TableHead>
              <TableHead className="p-2 w-[10%] min-w-[80px]">
                Quantity
              </TableHead>
              <TableHead className="p-2 w-[15%] min-w-[100px]">Date</TableHead>
              <TableHead className="p-2 w-[15%] min-w-[100px]">Price</TableHead>
              <TableHead className="p-2 w-[15%] min-w-[120px]">
                Status
              </TableHead>
              <TableHead className="p-2 w-[15%] min-w-[120px]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx} className="border-b last:border-none">
                <TableCell className="p-2 w-[30%]">
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        item.productImage || "/profile/product-placeholder.jpg"
                      }
                      alt={item.product}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div>
                      <div className="font-medium">{item.product}</div>
                      <div className="text-sm text-gray-500">{item.brand}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-2 w-[10%]">{item.quantity}</TableCell>
                <TableCell className="p-2 w-[15%]">{item.date}</TableCell>
                <TableCell className="p-2 w-[15%]">MRP={item.price}</TableCell>
                <TableCell className="p-2 w-[15%]">{item.status}</TableCell>
                <TableCell className="p-2 w-[15%]">
                  <Button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">
                    {item.actionLabel}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end mt-4 gap-2">
        {customButtons ? (
          customButtons
        ) : (
          <>
            {status === "completed" && (
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm">
                Leave a Review
              </Button>
            )}
            <Button variant="outline" className="text-sm">
              Chat with seller
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
