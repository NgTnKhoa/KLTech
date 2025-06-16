import {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Alert, AlertDescription} from "@/components/ui/alert";
import ProductGrid from "@/components/products/ProductGrid";
import {ChevronRight, Minus, Plus, ShoppingBag, Star} from "lucide-react";
import {formatCurrency} from "@/lib/utils";
import {useCart} from "@/context/CartContext";
import {productService} from "@/services/product.service.ts";
import {Product} from "@/models/product.model.ts";
import {categoryService} from "@/services/category.service.ts";
import ReviewCard from "@/components/products/ReviewCard.tsx";
import {reviewService} from "@/services/review.service.ts";
import {Review, ReviewRequest} from "@/models/review.model.ts";
import {toast} from "sonner";

const ProductPage = () => {
  const {productId} = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviewValue, setReviewValue] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  const {addToCart} = useCart();

  useEffect(() => {
    if (productId) {
      const getProduct = async () => {
        let foundProduct = await productService.getProductById(productId);
        foundProduct = foundProduct.data;

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.thumbnail);
          setSelectedColor(foundProduct.colors[0]);

          const getRelatedProducts = async () => {

            // Get related products
            let relatedProducts = await categoryService.getAllProducts(foundProduct.categoryId);
            relatedProducts = relatedProducts.data;

            relatedProducts = relatedProducts.filter(p => p.id !== foundProduct.id);

            // If we don't have enough products in the same category, add some featured products
            if (relatedProducts.length < 4) {
              let featuredProducts = await productService.getAllFeaturedProducts();
              featuredProducts = featuredProducts.data

              featuredProducts = featuredProducts.filter(
                  p => p.id !== foundProduct.id
              );

              setRelatedProducts([...relatedProducts, ...featuredProducts].slice(0, 4));
            } else {
              setRelatedProducts(relatedProducts.slice(0, 4));
            }
          };

          getRelatedProducts();
        }
      };

      const getReviews = async () => {
        const response = await reviewService.getReviewsByProductId(productId);
        setReviews(response.data);
      }

      getReviews()
      getProduct();
    }
  }, [productId]);


  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product && selectedColor) {
      addToCart(product, quantity, selectedColor);
    }
  };

  const postReviewHandler = async () => {
    const username = localStorage.getItem('username');
    if (username === null) {
      navigate('/login');
      toast.info("Bạn cần đăng nhập để viết đánh giá")
    } else if (rating === 0) {
      toast.info("Bạn cần vote số sao cho sản phẩm")
    } else if (reviewValue.trim().length === 0) {
      toast.info("Bạn cần để lại nhận xét sản phẩm")
    } else {
      const review: ReviewRequest = {
        rating: rating,
        content: reviewValue,
        author: username,
        productId: productId,
      }

      const newReview: Review = (await reviewService.createReview(review)).data;

      setReviews((prev) => [newReview, ...prev]);
      toast.success("Đăng đánh giá sản phẩm thành công");

      setRating(0);
      setReviewValue("");
    }
  }

  if (!product) {
    return (
        <PageLayout>
          <div className="container px-4 py-12">
            <Alert>
              <AlertDescription>Product not found</AlertDescription>
            </Alert>
          </div>
        </PageLayout>
    );
  }

  return (
      <PageLayout>
        <div className="container px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground"/>
            {/*<Link to={`/category/${product.category}`} className="text-muted-foreground hover:text-foreground">*/}
            {/*  {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}*/}
            {/*</Link>*/}
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground"/>
            <span className="font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                <img
                    src={`http://localhost:80/api/v1/files/${product.thumbnail}`}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/*{product.images.map((image, index) => (*/}
                {/*  <button */}
                {/*    key={index}*/}
                {/*    className={`aspect-square rounded overflow-hidden border-2 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}*/}
                {/*    onClick={() => setSelectedImage(image)}*/}
                {/*  >*/}
                {/*    <img */}
                {/*      src={image} */}
                {/*      alt={`${product.name} ${index + 1}`} */}
                {/*      className="h-full w-full object-cover object-center"*/}
                {/*    />*/}
                {/*  </button>*/}
                {/*))}*/}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/*{product.isNew && (*/}
                  {/*  <Badge className="bg-fashion-700">New</Badge>*/}
                  {/*)}*/}
                  {/*{product.onSale && (*/}
                  {/*  <Badge variant="destructive">Sale</Badge>*/}
                  {/*)}*/}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

                <div className="flex items-center text-xl">
                  {product.price ? (
                      <>
                    <span className="text-destructive font-semibold">
                      {formatCurrency(product.price * (1 - product.discount / 100))}
                    </span>
                        <span className="ml-2 text-muted-foreground line-through">
                      {formatCurrency(product.price)}
                    </span>
                      </>
                  ) : (
                      <span className="font-semibold">{formatCurrency(product.price)}</span>
                  )}
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                <div>
                  <h3 className="font-medium mb-2">Màu sắc</h3>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
                    {product.colors.map((color) => (
                        <div key={color} className="flex flex-col items-center gap-1">
                          <RadioGroupItem
                              value={color}
                              id={`color-${color}`}
                              className="sr-only peer"
                          />
                          <Label
                              htmlFor={`color-${color}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border-2 peer-data-[state=checked]:border-primary cursor-pointer"
                          >
                          <span
                              className="h-6 w-6 rounded-full"
                              style={{backgroundColor: color}}
                          ></span>
                          </Label>
                          <span className="text-xs">{color}</span>
                        </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Số lượng</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4"/>
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity}>
                      <Plus className="h-4 w-4"/>
                    </Button>
                  </div>
                </div>

                <Button
                    className="w-full mt-6" size="lg"
                    onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-4 w-4"/> Thêm vào giỏ hàng
                </Button>
              </div>

              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Mô tả</TabsTrigger>
                  <TabsTrigger value="shipping">Giao Hàng</TabsTrigger>
                  <TabsTrigger value="returns">Trả hàng</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Sản phẩm của chúng tôi được nhập khẩu với nguồn gốc rõ ràng và đảm bảo được sự yên tâm của khách hàng.
                    Mỗi sản phẩm được chế tác cẩn thận với sự chú ý đến từng chi tiết và độ hoàn thiện.
                  </p>
                  <ul className="list-disc text-sm text-muted-foreground mt-2 pl-5">
                    <li>Sản phẩm chất lượng cao</li>
                    <li>Sản xuất rõ nguồn gốc</li>
                    <li>Được thiết kế thân thiện với người dùng</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi cung cấp nhiều lựa chọn vận chuyển để đáp ứng nhu cầu của bạn:
                  </p>
                  <ul className="list-disc text-sm text-muted-foreground mt-2 pl-5">
                    <li>Vận chuyển tiêu chuẩn (3-5 ngày): {formatCurrency(15000)}</li>
                    <li>Vận chuyển nhanh (2-3 ngày): {formatCurrency(25000)}</li>
                    <li>Giao hàng ngày hôm sau (đặt hàng trước 2 giờ chiều): {formatCurrency(45000)}</li>
                    <li>Miễn phí vận chuyển tiêu chuẩn cho các đơn hàng trên {formatCurrency(1000000)}</li>
                  </ul>
                </TabsContent>
                <TabsContent value="returns" className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi muốn bạn hoàn toàn hài lòng với sản phẩm bạn mua:
                  </p>
                  <ul className="list-disc text-sm text-muted-foreground mt-2 pl-5">
                    <li>Chính sách trả hàng trong vòng 30 ngày đối với các mặt hàng chưa mặc</li>
                    <li>Miễn phí trả hàng đối với các đơn hàng trong nước</li>
                    <li>Các mặt hàng phải được trả lại trong bao bì gốc</li>
                    <li>Có biên lai quà tặng để dễ dàng trả hàng</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Đánh giá sản phẩm</h2>
            <div className="space-y-6">
              <div className="border rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-1 mt-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-xl ${
                              star <= rating ? "text-yellow-400" : "text-gray-400"
                          } hover:text-yellow-500`}
                      >
                        <Star
                            className="h-5 w-5"
                            fill={star <= rating ? "currentColor" : "none"}
                            stroke="currentColor"
                        />
                      </button>
                  ))}
                </div>

                <textarea
                    value={reviewValue}
                    onChange={(e) => setReviewValue(e.target.value)}
                    className="w-full resize-none rounded-md border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={3}
                    placeholder="Viết đánh giá của bạn..."
                />

                <div className="flex justify-end mt-2">
                  <button
                      onClick={postReviewHandler}
                      className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>

              {reviews.map((review) => (
                  <ReviewCard
                      key={review.id}
                      product={product}
                      author={localStorage.getItem('username')}
                      review={review}
                      onDelete={() => {
                        setReviews(prev => prev.filter(r => r.id !== review.id));
                      }}
                      onEdit={(updatedReview) =>
                          setReviews(prev =>
                              prev.map(r => r.id === updatedReview.id ? updatedReview : r)
                          )
                      }
                  />
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Bạn cũng có thể thích</h2>
            <ProductGrid products={relatedProducts}/>
          </div>
        </div>
      </PageLayout>
  );
};

export default ProductPage;
