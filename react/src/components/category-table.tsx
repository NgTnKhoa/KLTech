import { DataTable } from "@/components/data-table";
import {Category} from "@/models/category.model.ts";
import {useState} from "react";
import {categoryColumns} from "@/components/category-columns.tsx";
import {CategoryEditDialog} from "@/components/category-edit-dialog.tsx";

export function CategoryTable({data, setData}: { data: Category[], setData?: (value: (((prevState: Category[]) => Category[]) | Category[])) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [open, setOpen] = useState(false)

  const handleRowClick = (category: Category) => {
    setSelectedCategory(category)
    setOpen(true)
  }

  return (
      <>
        <DataTable
            columns={categoryColumns}
            data={data}
            onRowClick={handleRowClick}
        />
        <CategoryEditDialog
            open={open}
            onClose={() => setOpen(false)}
            category={selectedCategory}
            categories={data}
            setCategories={setData}
        />
      </>
  );
}
