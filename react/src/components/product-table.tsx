import { DataTable } from "@/components/data-table";
import { Product } from "@/models/product.model";
import {useState} from "react";
import {productColumns} from "@/components/product-columns.tsx";
import {ProductEditDialog} from "@/components/product-edit-dialog.tsx";

export function ProductTable({data, setData}: { data: Product[], setData?: (value: (((prevState: Product[]) => Product[]) | Product[])) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
      <>
        <DataTable
            columns={productColumns}
            data={data}
            onRowClick={handleRowClick}
        />
        <ProductEditDialog
            open={open}
            onClose={() => setOpen(false)}
            product={selectedProduct}
            products={data}
            setProducts={setData}
        />
      </>
  );
}
