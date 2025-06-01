import { DataTable } from "@/components/data-table";
import {Category} from "@/models/category.model.ts";
import {useState} from "react";
import {categoryColumns} from "@/components/category-columns.tsx";
import {CategoryEditDialog} from "@/components/category-edit-dialog.tsx";

export function CategoryTable({ data }: { data: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>(data)

  const handleRowClick = (category: Category) => {
    setSelectedCategory(category)
    setOpen(true)
  }

  return (
      <>
        <DataTable<Category, unknown>
            columns={categoryColumns}
            data={categories}
            onRowClick={handleRowClick}
        />
        <CategoryEditDialog
            open={open}
            onClose={() => setOpen(false)}
            category={selectedCategory}
            categories={categories}
            setCategories={setCategories}
        />
      </>
  );
}
