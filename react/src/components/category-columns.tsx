import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Category} from "@/models/category.model.ts";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({row}) => (
        <img
            src={`http://localhost:8081/api/v1/files/${row.getValue("thumbnail")}`}
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
];
