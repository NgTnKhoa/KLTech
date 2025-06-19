import PageLayout from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Minus, Plus, Trash2, ArrowRight} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useCart} from "@/context/CartContext";
import {formatCurrency} from "@/lib/utils";
import {authService} from "@/services/auth.service.ts";
import {useState} from "react";
import {toast} from "sonner"
import {Order, OrderItem, OrderItemRequest, OrderRequest} from "@/models/order.model.ts";
import {orderService} from "@/services/order.service.ts";
import {Input} from "@/components/ui/input.tsx";
import {paymentService} from "@/services/payment.service.ts";
import {PaymentRequest} from "@/models/payment.model.ts";
import {v4 as uuidv4} from "uuid";

const CartPage = () => {
  const {cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal} = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
        <PageLayout>
          <div className="container px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
            <Alert>
              <AlertDescription>Giỏ hàng hiện trống</AlertDescription>
            </Alert>
            <div className="mt-8">
              <Link to="/categories">
                <Button>Tiếp tục mua sắm</Button>
              </Link>
            </div>
          </div>
        </PageLayout>
    );
  }

  const orderHandler = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate('/login');
    } else {
      const response: boolean = await authService.validateToken(accessToken);

      if (response) {
        setConfirmOpen(true)
      } else {
        navigate('/login');
      }
    }
  }

  const paymentHandler = async () => {
    if (addressValue.trim() !== '' && addressValue.trim().length > 5) {
      const orderItems: OrderItemRequest[] = cartItems.map((item) => {
        const price = item.product.price * (1 - item.product.discount / 100);
        return {
          productId: item.product.id,
          orderId: "",
          quantity: item.quantity,
          price: price,
          amount: price * item.quantity,
        };
      });

      const totalAmount = orderItems.reduce((sum, item) => sum + item.amount, 0);

      const order: OrderRequest = {
        userId: localStorage.getItem("id"),
        amount: totalAmount,
        status: "SUCCESS",
        address: addressValue,
        orderItems: orderItems,
      }

      const newOrder: Order = (await orderService.createOrder(order)).data;

      const payment: PaymentRequest = {
        status: "UNPAID",
        method: "CREDIT_CARD",
        amount: newOrder.amount,
        transactionId: uuidv4(),
        orderId: newOrder.id
      }

      await paymentService.createPayment(payment);
      setAddressValue("");
      setConfirmOpen(false);
      clearCart();
      toast.info('Đặt hàng thành công');
      navigate('/');
    } else {
      toast.info('Bạn chưa nhập địa chỉ');
    }
  }

  return (
      <PageLayout>
        <div className="container px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const price = item.product.price * (1 - item.product.discount / 100);
                const itemTotal = price * item.quantity;

                return (
                    <Card key={`${item.product.id}-${item.color}`}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 rounded overflow-hidden bg-secondary shrink-0">
                            <img
                                src={`http://localhost:80/api/v1/files/${item.product.thumbnail}`}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                                {item.product.name}
                              </Link>
                              <span className="font-medium">{formatCurrency(itemTotal)}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Màu sắc: {item.color}</p>
                              <p>Giá: {formatCurrency(price)}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                    disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3"/>
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3"/>
                                </Button>
                              </div>
                              <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-destructive"
                                  onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1"/> Xóa
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                );
              })}

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={clearCart}>
                  Xóa tất cả
                </Button>
                <Link to="/categories">
                  <Button variant="link" size="sm" className="text-muted-foreground">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Đơn hàng</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tổng cộng</span>
                      <span>{formatCurrency(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Tính toán khi thanh toán</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thuế</span>
                      <span>Tính toán khi thanh toán</span>
                    </div>

                    <Separator className="my-4"/>

                    <div className="flex justify-between font-semibold">
                      <span>Số tiền ước tính</span>
                      <span>{formatCurrency(getCartTotal())}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                      onClick={orderHandler}
                      className="w-full"
                      size="lg"
                  >
                    Tiến hành thanh toán <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                  <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Xác nhận thanh toán</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {cartItems.map((item) => {
                          const price = item.product.price * (1 - item.product.discount / 100);
                          const itemTotal = price * item.quantity;

                          return (
                              <div key={`${item.product.id}-${item.color}`} className="flex items-start gap-4">
                                <img
                                    src={`http://localhost:80/api/v1/files/${item.product.thumbnail}`}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-sm text-muted-foreground">Màu: {item.color}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.quantity} x {formatCurrency(price)} ={" "}
                                    <span className="font-medium text-primary">{formatCurrency(itemTotal)}</span>
                                  </p>
                                </div>
                              </div>
                          );
                        })}
                        <div className="border-t pt-4 flex justify-between font-semibold">
                          <span>Tổng cộng</span>
                          <span>{formatCurrency(getCartTotal())}</span>
                        </div>
                      </div>
                      <div>
                        <Input
                            placeholder="Vui lòng nhập địa chỉ giao hàng"
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                      </div>

                      <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={paymentHandler}>
                          Xác nhận & Thanh toán
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
  );
};

export default CartPage;
