import {AppSidebar} from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {useEffect, useState} from "react";
import {Product} from "@/models/product.model.ts";
import {Category} from "@/models/category.model.ts";
import {productService} from "@/services/product.service.ts";
import {categoryService} from "@/services/category.service.ts";
import {ProductTable} from "@/components/product-table.tsx";
import {CategoryTable} from "@/components/category-table.tsx";
import CreateProductPage from "@/pages/CreateProductPage.tsx";
import CreateCategoryPage from "@/pages/CreateCategoryPage.tsx";

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSection, setActiveSection] = useState<"product" | "category" | "product-create" | "category-create">(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response.data);
    }

    const getCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    }

    getProducts();
    getCategories();
  }, []);

  return (
      <SidebarProvider>
        <AppSidebar onSectionChange={setActiveSection}/>
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {activeSection === "product" && (
                <ProductTable data={products} />
            )}
            {activeSection === "category" && (
                <CategoryTable data={categories} />
            )}
            {activeSection === "product-create" && (
                <CreateProductPage/>
            )}
            {activeSection === "category-create" && (
                <CreateCategoryPage/>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
};

export default AdminPage;
