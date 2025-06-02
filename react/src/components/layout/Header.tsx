import {Link, useNavigate} from "react-router-dom";
import {ShoppingBag, Menu, X, Search, Image, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {useCart} from "@/context/CartContext";
import {categoryService} from "@/services/category.service.ts";
import {Category} from "@/models/category.model.ts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {authService} from "@/services/auth.service.ts";
import {Product} from "@/models/product.model.ts";
import {productService} from "@/services/product.service.ts";
import {formatCurrency} from "@/lib/utils.ts";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {getCartCount} = useCart();
  const cartCount = getCartCount();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response.data);
    }

    const getCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    }

    const getUserInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLogin(false);
      } else {
        const response: boolean = await authService.validateToken(accessToken);

        if (response) {
          setIsLogin(true)
        } else {
          setIsLogin(false);
        }
      }
    }

    getProducts();
    getCategories();
    getUserInfo()
  }, []);

  return (
      <div className="border-b">
        <div className="flex h-16 items-center px-4 container">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/categories" className="text-lg font-medium">
                  Categories
                </Link>
                <Link to="/offers" className="text-lg font-medium">
                  Offers
                </Link>
                <div className="h-px bg-border my-2"/>
                <Link to="/category/0e744e51-3669-40ad-8bd9-cf2f566529cc" className="text-base">
                  Điện thoại & Phụ kiện
                </Link>
                <Link to="/category/4cf792e5-84dc-4cf1-8358-9c496f05a354" className="text-base">
                  Máy tính & Laptop
                </Link>
                <Link to="/category/28fdc328-3036-47f0-b78e-a0b482b278c3" className="text-base">
                  Phụ kiện công nghệ khác
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="ml-4 md:ml-0">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight">
              KLTech
            </Link>
          </div>

          <nav className="mx-6 hidden md:flex items-center space-x-6 text-sm font-medium">
            {
              categories.map((category) => (
                  <Link to={`/category/${category.id}`} key={category.id} className="transition-colors hover:text-foreground/50">
                    {category.name}
                  </Link>
              ))
            }
          </nav>

          <div className="ml-auto flex items-center space-x-2">
            {isSearchOpen ? (
                <div className="relative">
                  <div className="flex items-center border rounded-md px-2 mr-2 bg-white">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="py-1 px-2 outline-none w-[150px] md:w-[200px]"
                        value={searchTerm}
                        onChange={(e) => {
                          const keyword = e.target.value;
                          setSearchTerm(keyword);

                          if (keyword.trim() === "") {
                            setSearchResults([]);
                          } else {
                            const filtered = products.filter(p =>
                                p.name.toLowerCase().includes(keyword.toLowerCase())
                            );
                            setSearchResults(filtered);
                          }
                        }}
                    />
                    <X
                        className="h-4 w-4 cursor-pointer opacity-70"
                        onClick={() => {
                          setSearchTerm("");
                          setSearchResults([]);
                          setIsSearchOpen(false);
                        }}
                    />
                  </div>

                  {searchResults.length > 0 && (
                      <div className="absolute top-full mt-1 w-full z-50 bg-white border shadow-md rounded-md max-h-60 overflow-y-auto">
                        {searchResults.map((product) => (
                            <div
                                onClick={() => {
                                  navigate(`/product/${product.id}`);
                                  setSearchResults([]);
                                  setIsSearchOpen(false);
                                  setSearchTerm("");
                                }}
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" key={product.id}
                            >
                              <div>
                                <img
                                    src={`http://localhost:80/api/v1/files/${product.thumbnail}`}
                                    alt={product.name}
                                    className="w-10 h-10 object-cover object-center"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <div
                                    key={product.id}
                                    className="px-4 text-sm"
                                >
                                  {product.name}
                                </div>
                                <div
                                    className="px-4 text-sm"
                                >
                                  {formatCurrency(product.price * (1 - product.discount / 100))}
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5"/>
                  <span className="sr-only">Search</span>
                </Button>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5"/>
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartCount}
                </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            {isLogin ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <User className="h-5 w-5"/>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          localStorage.clear();
                          navigate("/login");
                        }}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                ) :
                (
                    <Button variant="ghost" size="icon" onClick={() => navigate("/login")}>Login</Button>
                )
            }
          </div>
        </div>
      </div>
  );
};

export default Header;
