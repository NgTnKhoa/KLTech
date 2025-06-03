import { DataTable } from "@/components/data-table";
import { Product } from "@/models/product.model";
import {useState} from "react";
import {productColumns} from "@/components/product-columns.tsx";
import {ProductEditDialog} from "@/components/product-edit-dialog.tsx";

export function ProductTable({data}: { data: Product[]}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(data)

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
      <>
        <DataTable
            columns={productColumns}
            data={products}
            onRowClick={handleRowClick}
        />
        <ProductEditDialog
            open={open}
            onClose={() => setOpen(false)}
            product={selectedProduct}
            products={products}
            setProducts={setProducts}
        />
      </>
  );
}
