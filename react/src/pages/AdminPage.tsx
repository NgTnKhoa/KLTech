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
          {/*<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">*/}
          {/*  <div className="flex items-center gap-2 px-4">*/}
          {/*    <SidebarTrigger className="-ml-1"/>*/}
          {/*    <Separator*/}
          {/*        orientation="vertical"*/}
          {/*        className="mr-2 data-[orientation=vertical]:h-4"*/}
          {/*    />*/}
          {/*    <Breadcrumb>*/}
          {/*      <BreadcrumbList>*/}
          {/*        <BreadcrumbItem className="hidden md:block">*/}
          {/*          <BreadcrumbLink href="#">*/}
          {/*            Building Your Application*/}
          {/*          </BreadcrumbLink>*/}
          {/*        </BreadcrumbItem>*/}
          {/*        <BreadcrumbSeparator className="hidden md:block"/>*/}
          {/*        <BreadcrumbItem>*/}
          {/*          <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
          {/*        </BreadcrumbItem>*/}
          {/*      </BreadcrumbList>*/}
          {/*    </Breadcrumb>*/}
          {/*  </div>*/}
          {/*</header>*/}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
            {/*  <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
            {/*  <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
            {/*  <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
            {/*</div>*/}
            {/*<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>*/}
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
