
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-24">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">KLTech</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Sản phẩm hiện đại, sang trọng dành cho từng mức giá của khách hàng. Có nguồn gốc xuất nhập khẩu rõ ràng và cam kết về chất lượng.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Cửa hàng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/0e744e51-3669-40ad-8bd9-cf2f566529cc" className="text-muted-foreground hover:text-foreground">
                  Điện thoại & Phụ kiện
                </Link>
              </li>
              <li>
                <Link to="/category/4cf792e5-84dc-4cf1-8358-9c496f05a354" className="text-muted-foreground hover:text-foreground">
                  Máy tính & Laptop
                </Link>
              </li>
              <li>
                <Link to="/category/28fdc328-3036-47f0-b78e-a0b482b278c3" className="text-muted-foreground hover:text-foreground">
                  Phụ kiện công nghệ khác
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Dịch vụ khách hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Giao hàng & Trả hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Câu chuyện của chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Sự nhiệp
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Liên hệ với chúng tôi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 mt-8">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} KLTech. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
