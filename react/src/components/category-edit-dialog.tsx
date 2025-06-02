import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react"
import {Category} from "@/models/category.model.ts";
import {categoryService} from "@/services/category.service.ts";
import {fileService} from "@/services/file.service.ts";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface CategoryEditDialogProps {
  open: boolean
  onClose: () => void
  category: Category | null
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export function CategoryEditDialog({open, onClose, category, categories, setCategories}: CategoryEditDialogProps) {
  const [formData, setFormData] = useState<Category | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (category) {
      setPreviewUrl('http://localhost:80/api/v1/files/' + category?.thumbnail)
      setFormData(category)
    }
  }, [category])

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

    await categoryService.updateCategory(formData.id, formData)
    setCategories(categories.map(p => p.id === formData.id ? formData : p))
    onClose();

    toast.info("Cập nhật sản phẩm thành công")
  }

  if (!formData) return null

  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tên danh mục</label>
              <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên danh mục"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Nhập slug"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mô tả</label>
              <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả"
              />
            </div>

            <div className="space-y-2">
              <Label>Trưng bày</Label>
              <Select
                  value={String(formData.featured)}
                  onValueChange={(value) => setFormData((prev) => ({...prev, featured: value === "true"}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Có</SelectItem>
                  <SelectItem value="false">Không</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ảnh đại diện</label>
              <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    setSelectedFile(file)
                    const url = URL.createObjectURL(file)
                    setPreviewUrl(url)
                  }}
              />
              {previewUrl && (
                  <div className="flex justify-center pt-2">
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