import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Product} from "@/models/product.model.ts";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({row}) => (
        <img
            src={`http://localhost:80/api/v1/files/${row.getValue("thumbnail")}`}
            alt="Thumbnail"
            className="h-12 w-12 rounded object-cover"
        />
    ),
  },
  {
    accessorKey: "name",
    header: ({column}) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({row}) => {
      const price = parseFloat(row.getValue("price"));
      return <div className="text-left">{price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: () => <div className="text-center">Discount (%)</div>,
    cell: ({row}) => <div className="text-center">{row.getValue("discount")}%</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({row}) => (
        <div className="text-center">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
              row.getValue("status") !== "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {row.getValue("status")}
          </span>
        </div>
    ),
  },
];
