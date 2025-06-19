
import PageLayout from "@/components/layout/PageLayout";
import ProductGrid from "@/components/products/ProductGrid";
import { getSaleProducts } from "@/data/products";
import {useEffect, useState} from "react";
import {Product} from "@/models/product.model.ts";
import {productService} from "@/services/product.service.ts";
import {categoryService} from "@/services/category.service.ts";

const OffersPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response.data);
    }

    getProducts();
  }, []);

  return (
    <PageLayout>
      {/* Hero Banner */}
      <div className="relative bg-fashion-950 text-white py-16">
        <div className="container px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Khuyến mãi & Ưu đãi đặc biệt
            </h1>
            <p className="text-lg text-white/80 mb-4">
              Khám phá chương trình khuyến mại mới nhất của chúng tôi và tận hưởng mức giảm giá độc quyền cho một số mặt hàng được chọn.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="currentColor"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
      </div>

      {/* Current Offers */}
      <div className="container px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Các mặt hàng đang giảm giá hiện tại</h2>
        <ProductGrid products={products} />
      </div>

      {/* Promotional Cards */}
      {/*<div className="container px-4 py-12">*/}
      {/*  <h2 className="text-2xl font-bold mb-8">Khuyến mãi</h2>*/}
      {/*  */}
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">*/}
      {/*    /!* Promo Card 1 *!/*/}
      {/*    <div className="bg-fashion-100 rounded-lg overflow-hidden">*/}
      {/*      <div className="p-8">*/}
      {/*        <div className="inline-block px-3 py-1 bg-fashion-700 text-white rounded-full text-xs font-medium mb-4">*/}
      {/*          Limited Time*/}
      {/*        </div>*/}
      {/*        <h3 className="text-xl font-bold mb-2">Free Shipping on Orders $75+</h3>*/}
      {/*        <p className="text-muted-foreground mb-4">*/}
      {/*          Enjoy complimentary standard shipping on all domestic orders over $75.*/}
      {/*        </p>*/}
      {/*        <div className="text-sm text-muted-foreground">*/}
      {/*          Valid through December 31, 2023. Excludes international shipping.*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    */}
      {/*    /!* Promo Card 2 *!/*/}
      {/*    <div className="bg-fashion-50 rounded-lg overflow-hidden border border-fashion-200">*/}
      {/*      <div className="p-8">*/}
      {/*        <div className="inline-block px-3 py-1 bg-fashion-700 text-white rounded-full text-xs font-medium mb-4">*/}
      {/*          New Customers*/}
      {/*        </div>*/}
      {/*        <h3 className="text-xl font-bold mb-2">10% Off Your First Order</h3>*/}
      {/*        <p className="text-muted-foreground mb-4">*/}
      {/*          Subscribe to our newsletter and receive 10% off your first purchase.*/}
      {/*        </p>*/}
      {/*        <div className="text-sm text-muted-foreground">*/}
      {/*          Enter code WELCOME10 at checkout. Cannot be combined with other offers.*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="container px-4 py-12 mb-12">*/}
      {/*  <div className="bg-muted md:p-12 rounded-lg">*/}
      {/*    <div className="max-w-xl mx-auto text-center">*/}
      {/*      <h2 className="text-2xl font-bold mb-4">Cập nhật thông tin về các ưu đãi</h2>*/}
      {/*      <p className="text-muted-foreground mb-6">*/}
      {/*        Đăng ký nhận bản tin của chúng tôi để là người đầu tiên biết về các ưu đãi và khuyến mãi độc quyền.*/}
      {/*      </p>*/}
      {/*      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">*/}
      {/*        <input*/}
      {/*          type="email"*/}
      {/*          placeholder="Nhập email của bạn"*/}
      {/*          className="flex-1 px-4 py-2 border rounded-md"*/}
      {/*        />*/}
      {/*        <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">*/}
      {/*          Đăng ký*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </PageLayout>
  );
};

export default OffersPage;
