import {AppSidebar} from "@/components/app-sidebar";
import {CategoryTable} from "@/components/category-table.tsx";
import {ProductTable} from "@/components/product-table.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {UserTable} from "@/components/user-table";
import {Category} from "@/models/category.model.ts";
import {Product} from "@/models/product.model.ts";
import {User} from "@/models/user.model";
import CreateCategoryPage from "@/pages/CreateCategoryPage.tsx";
import CreateProductPage from "@/pages/CreateProductPage.tsx";
import {categoryService} from "@/services/category.service.ts";
import {productService} from "@/services/product.service.ts";
import {useEffect, useState} from "react";
import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {userService} from "@/services/user.service.ts";

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<
      | "product-create"
      | "product"
      | "category-create"
      | "category"
      | "user"
  >(null);
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  useEffect(() => {
    const validateToken = async (accessToken: string) => {
      const isValid: boolean = await authService.validateToken(accessToken);
      setIsTokenValid(isValid);
      return isValid;
    };

    const checkAccess = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");

      if (accessToken !== null) {
        const isValid = await validateToken(accessToken);

        if (!isValid || role !== "ADMIN") {
          navigate("/403");
        }
      } else {
        navigate("/403");
      }
    };

    const getProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response.data);
    };

    const getCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    };

    const getUsers = async () => {
      const response = await userService.getUsers();
      setUsers(response);
    };

    checkAccess()
    getProducts();
    getCategories();
    getUsers();
  }, []);

  return (
      <SidebarProvider>
        <AppSidebar onSectionChange={setActiveSection}/>
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {activeSection === "product-create" && <CreateProductPage setData={setProducts}/>}
            {activeSection === "product" && <ProductTable data={products} setData={setProducts}/>}
            {activeSection === "category-create" && <CreateCategoryPage setData={setCategories}/>}
            {activeSection === "category" && <CategoryTable data={categories} setData={setCategories}/>}
            {activeSection === "user" && <UserTable data={users} setData={setUsers}/>}
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
};

export default AdminPage;
