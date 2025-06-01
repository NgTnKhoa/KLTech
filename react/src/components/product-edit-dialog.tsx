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
import {Textarea} from "@/components/ui/textarea.tsx";
import {fileService} from "@/services/file.service.ts";
import {categoryService} from "@/services/category.service.ts";

interface ProductEditDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
  products: Product[]
  setProducts: (products: Product[]) => void
}

export function ProductEditDialog({open, onClose, product, products, setProducts}: ProductEditDialogProps) {
  const [formData, setFormData] = useState<Product | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(('http://localhost:80/api/v1/files/82f96042-1285-429a-87a3-0cfb5cdea698') || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!formData) return

    const newThumbnail = selectedFile ? await fileService.uploadFile(selectedFile): "";

    if (newThumbnail !== "") {
      formData.thumbnail = newThumbnail;
      await productService.updateProduct(formData.id, formData)
      setProducts(products.map(p => p.id === formData.id ? formData : p))
      onClose()
    } else {
      await productService.updateProduct(formData.id, formData)
      setProducts(products.map(p => p.id === formData.id ? formData : p))
      onClose()
    }
  }

  if (!formData) return null

  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Tên sản phẩm"/>
            <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug"/>
            <Input name="price" value={formData.price} onChange={handleChange} placeholder="Giá"/>
            <Input name="discount" value={formData.discount} onChange={handleChange} placeholder="Giảm giá"/>
            <Input name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả"/>
            <Select
                value={formData.status}
                onValueChange={(value) =>
                    setFormData((prev) => ({...prev, status: value}))
                }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              </SelectContent>
            </Select>
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
            <div className="flex justify-center">
              {previewUrl && (
                  <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                  />
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