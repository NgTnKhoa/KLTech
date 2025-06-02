import PageLayout from "@/components/layout/PageLayout";
import {useEffect, useState} from "react";
import {Category} from "@/models/category.model.ts";
import {categoryService} from "@/services/category.service.ts";
import CategoryCard from "@/components/products/CategoryCard.tsx";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
      console.log(response.data);
    }

    getCategories();
  }, []);

  return (
      <PageLayout>
        <div className="container px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Danh mục</h1>
          <p className="text-muted-foreground mb-8">Duyệt tất cả các danh mục sản phẩm của chúng tôi</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              categories.map((category) => (
                  <CategoryCard key={category.id} category={category}/>
              ))
            }
          </div>
        </div>
      </PageLayout>
  );
};

export default CategoriesPage;
