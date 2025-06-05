import { AppSidebar } from "@/components/app-sidebar";
import { CategoryTable } from "@/components/category-table.tsx";
import { ProductTable } from "@/components/product-table.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Category } from "@/models/category.model.ts";
import { Product } from "@/models/product.model.ts";
import { User } from "@/models/user.model";
import CreateCategoryPage from "@/pages/CreateCategoryPage.tsx";
import CreateProductPage from "@/pages/CreateProductPage.tsx";
import { categoryService } from "@/services/category.service.ts";
import { productService } from "@/services/product.service.ts";
import { useEffect, useState } from "react";
import { UserTable } from "@/components/user-table";

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<
    | "product"
    | "category"
    | "product-create"
    | "category-create"
    | "user-create"
    | "user"
  >(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response.data);
    };

    const getCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    };

    // const getUsers = async () => {
    //   const response = await
    // }

    getProducts();
    getCategories();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar onSectionChange={setActiveSection} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          {activeSection === "product" && <ProductTable data={products} />}
          {activeSection === "category" && <CategoryTable data={categories} />}
          {activeSection === "user" && <UserTable data={users} />}
          {activeSection === "product-create" && <CreateProductPage />}
          {activeSection === "category-create" && <CreateCategoryPage />}
          {activeSection === "user-create" && <></>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPage;
