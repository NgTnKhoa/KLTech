import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react"
import {Category} from "@/models/category.model.ts";
import {categoryService} from "@/services/category.service.ts";
import {fileService} from "@/services/file.service.ts";

interface CategoryEditDialogProps {
  open: boolean
  onClose: () => void
  category: Category | null
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export function CategoryEditDialog({open, onClose, category, categories, setCategories}: CategoryEditDialogProps) {
  const [formData, setFormData] = useState<Category | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(('http://localhost:80/api/v1/files/86f87572-22fc-4447-9dd8-7a04fcab66df') || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (category) {
      setFormData(category)
    }
  }, [category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!formData) return

    const newThumbnail = selectedFile ? await fileService.uploadFile(selectedFile): "";

    if (newThumbnail !== "") {
      formData.thumbnail = newThumbnail;
      await categoryService.updateCategory(formData.id, formData)
      setCategories(categories.map(p => p.id === formData.id ? formData : p))
      onClose()
    } else {
      await categoryService.updateCategory(formData.id, formData)
      setCategories(categories.map(p => p.id === formData.id ? formData : p))
      onClose()
    }
  }

  if (!formData) return null

  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thể loại</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Tên sản phẩm"/>
            <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug"/>
            <Input name="price" value={formData.description} onChange={handleChange} placeholder="Giá"/>
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