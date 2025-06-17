import PageLayout from "@/components/layout/PageLayout";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryCard from "@/components/products/CategoryCard";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";
import {getFeaturedProducts, getFeaturedCategories, getSaleProducts} from "@/data/products";
import {useEffect, useState} from "react";
import {Product} from "@/models/product.model.ts";
import {categoryService} from "@/services/category.service.ts";
import {productService} from "@/services/product.service.ts";
import {Category} from "@/models/category.model.ts";
import {authService} from "@/services/auth.service.ts";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
      <PageLayout>
        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[80vh] bg-secondary overflow-hidden">
          <div className="absolute inset-0 hero-overlay"></div>
          <img
              src="/img/banner.jpg"
              alt="Hero"
              className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Bộ sưu tập mùa mới</h1>
            <p className="text-lg md:text-xl mb-8 max-w-md text-center">
              Khám phá những phong cách mới nhất của chúng tôi được thiết kế dành cho cá nhân hiện đại
            </p>
            {/*<div className="flex gap-4">*/}
            {/*  <Link to="/category/device">*/}
            {/*    <Button className="bg-white text-black hover:bg-white/90">Shop</Button>*/}
            {/*  </Link>*/}
            {/*  <Link to="/category/technology">*/}
            {/*    <Button className="bg-white text-black hover:bg-white/90">Shop</Button>*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Mua sắm theo danh mục</h2>
            <Link to="/categories" className="text-sm font-medium flex items-center text-muted-foreground hover:text-foreground transition-colors mt-2 md:mt-0">
              Xem tất cả các danh mục <ArrowRight className="ml-1 h-4 w-4"/>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
              categories
              .filter((category) => category.featured)
              .map((category) => (
                  <CategoryCard key={category.id} category={category}/>
              ))
            }
          </div>
        </section>

        {/* Featured Products */}
        <section className="container px-4 py-16 bg-secondary/30">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
            <Link to="/categories" className="text-sm font-medium flex items-center text-muted-foreground hover:text-foreground transition-colors mt-2 md:mt-0">
              Mua sắm tất cả <ArrowRight className="ml-1 h-4 w-4"/>
            </Link>
          </div>
          <ProductGrid products={products.filter((product) => product.featured)}/>
        </section>

        {/* Sale Section */}
        <section className="container px-4 py-16">
          <div className="bg-fashion-100 rounded-lg overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-xs font-medium mb-4">
                  Limited Time
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Khuyến mãi đặc biệt</h2>
                <p className="text-muted-foreground mb-6">
                  Tiết kiệm tới 30% cho bộ sưu tập mới nhất. Chỉ trong thời gian có hạn.
                </p>
                <Link to="/offers" className="self-start">
                  <Button>Cửa hàng khuyến mãi</Button>
                </Link>
              </div>
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                    src="/img/sales.jpg"
                    alt="Sale"
                    className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sale Products */}
        <section className="container px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Đang giảm giá</h2>
          <ProductGrid products={products.sort((a,b) => b.discount - a.discount).slice(0, 4)}/>
          <div className="mt-10 flex justify-center">
            <Link to="/offers">
              <Button variant="outline" className="px-8">Xem tất cả sản phẩm giảm giá</Button>
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container px-4 py-16 bg-fashion-50">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Sign up for our newsletter to receive updates on new collections, exclusive offers, and styling tips.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </PageLayout>
  );
};

export default HomePage;
