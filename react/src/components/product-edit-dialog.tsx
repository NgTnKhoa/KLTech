import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Product} from "@/models/product.model"
import {useEffect, useState} from "react"
import {productService} from "@/services/product.service"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {fileService} from "@/services/file.service.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {categoryService} from "@/services/category.service.ts";
import {Category} from "@/models/category.model.ts";
import {Label} from "@/components/ui/label.tsx";
import {toast} from "sonner";

interface ProductEditDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
  products: Product[]
  setProducts: (products: Product[]) => void
}

export function ProductEditDialog({open, onClose, product, products, setProducts}: ProductEditDialogProps) {
  const [formData, setFormData] = useState<Product>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const availableColors = [
    "Đỏ",
    "Cam",
    "Vàng",
    "Lục",
    "Lam",
    "Chàm",
    "Tím"
  ];

  useEffect(() => {
    if (product) {
      setPreviewUrl('http://localhost:80/api/v1/files/' + product?.thumbnail)
      setFormData(product)
    }

    const getAllCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    }

    getAllCategories();
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!formData) return

    const newThumbnail = selectedFile ? await fileService.uploadFile(selectedFile) : "";

    if (newThumbnail !== "") {
      formData.thumbnail = newThumbnail;
    }

    await productService.updateProduct(formData.id, formData)
    setProducts(products.map(p => p.id === formData.id ? formData : p))
    onClose();

    toast.info("Cập nhật sản phẩm thành công")
  }

  if (!formData) return null

  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="price">Giá</Label>
              <Input id="price" name="price" value={formData.price} onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="discount">Giảm giá</Label>
              <Input id="discount" name="discount" value={formData.discount} onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-1 col-span-full">
              <Label htmlFor="description">Mô tả</Label>
              <Input id="description" name="description" value={formData.description} onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Trạng thái</Label>
              <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({...prev, status: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Trưng bày</Label>
              <Select
                  value={String(formData.featured)}
                  onValueChange={(value) => setFormData((prev) => ({...prev, featured: value === "true"}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Có</SelectItem>
                  <SelectItem value="false">Không</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 col-span-full">
              <Label>Danh mục</Label>
              <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({...formData, categoryId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Danh mục"/>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 col-span-full">
              <Label>Màu sắc</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                          id={color}
                          checked={formData.colors.includes(color)}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({
                              ...prev,
                              colors: checked
                                  ? [...prev.colors, color]
                                  : prev.colors.filter((c) => c !== color),
                            }));
                          }}
                      />
                      <label htmlFor={color} className="text-sm">{color}</label>
                    </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 col-span-full">
              <Label>Hình ảnh</Label>
              <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setSelectedFile(file);
                    const url = URL.createObjectURL(file);
                    setPreviewUrl(url);
                  }}
              />
              {previewUrl && (
                  <div className="mt-2 flex justify-center">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}