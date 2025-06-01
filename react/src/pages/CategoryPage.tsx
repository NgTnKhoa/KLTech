import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProductGrid from "@/components/products/ProductGrid";
import Filters from "@/components/products/Filters";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {SlidersHorizontal} from "lucide-react";
import {FilterOptions} from "@/types";
import {filterProducts, sortProducts} from "@/lib/utils";
import {Product} from "@/models/product.model.ts";
import {Category} from "@/models/category.model.ts";
import {productService} from "@/services/product.service.ts";
import {categoryService} from "@/services/category.service.ts";

const CategoryPage = () => {
  const {categoryId} = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>(null);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (categoryId) {
      const getCategory = async () => {
        const response = await categoryService.getCategoryById(categoryId);
        setCategory(response.data);
      }

      const getProducts = async () => {
        const response = await categoryService.getAllProducts(categoryId);
        setProducts(response.data);
        setFilteredProducts(response.data);
      }

      const getAllColors = async () => {
        const response = await categoryService.getAllColors(categoryId);
        setColors(response.data);
        console.log(response.data);
      }

      getCategory();
      getProducts();
      getAllColors();
    }
  }, [categoryId]);

  const handleFilterChange = (filters: FilterOptions) => {
    let result = [...products];

    // Apply filters
    result = filterProducts(result, filters);

    // Apply sorting
    // result = sortProducts(result, filters.sortBy);

    setFilteredProducts(result);
  };


  if (!category) {
    return (
        <PageLayout>
          <div className="container px-4 py-12">
            <Alert>
              <AlertDescription>Category not found</AlertDescription>
            </Alert>
          </div>
        </PageLayout>
    );
  }

  return (
      <PageLayout>
        <div className="container px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <Filters
                  onFilterChange={handleFilterChange}
                  availableColors={colors}
              />
            </div>

            {/* Mobile Filters */}
            <div className="md:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    <span>Filters</span>
                    <SlidersHorizontal className="h-4 w-4"/>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-4/5 sm:max-w-md">
                  <h2 className="text-lg font-semibold mb-6">Filters</h2>
                  <Filters
                      onFilterChange={handleFilterChange}
                      availableColors={colors}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products match your filters</p>
                    <Button onClick={() => handleFilterChange({})}>Reset Filters</Button>
                  </div>
              ) : (
                  <>
                    <div className="mb-4 text-sm text-muted-foreground">
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </div>
                    <ProductGrid products={filteredProducts}/>
                  </>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
  );
};

export default CategoryPage;
