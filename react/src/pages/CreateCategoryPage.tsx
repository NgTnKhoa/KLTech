import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {productService} from "@/services/product.service"
import {useNavigate} from "react-router-dom"
import {Category, CategoryRequest} from "@/models/category.model.ts";
import {categoryService} from "@/services/category.service.ts";
import {fileService} from "@/services/file.service.ts";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface CreateCategoryPageProps {
  setData?: (value: (((prevState: Category[]) => Category[]) | Category[])) => void
}

export default function CreateCategoryPage({setData}: CreateCategoryPageProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CategoryRequest>({
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    featured: null,
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    const {name, slug, description, featured} = formData;

    if (
        !name ||
        !slug ||
        !description ||
        featured === null ||
        !selectedFile
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi gửi!");
      return;
    }

    try {
      formData.thumbnail = selectedFile ? await fileService.uploadFile(selectedFile) : "";

      const newCategory = (await categoryService.createCategory(formData)).data
      toast.info('Tạo danh mục thành công');

      setFormData({
        name: "",
        slug: "",
        description: "",
        thumbnail: "",
        featured: null,
      });
      setPreviewUrl('');
      setSelectedFile(null);
      setData(prev => [newCategory, ...prev]);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo danh mục.");
      console.error(error);
    }
  }

  return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">Tạo danh mục mới</h1>

        <div>
          <Label className="block mb-1 font-medium">Tên danh mục</Label>
          <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
          />
        </div>

        <div>
          <Label className="block mb-1 font-medium">Slug</Label>
          <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
          />
        </div>

        <div>
          <Label className="block mb-1 font-medium">Mô tả</Label>
          <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
          />
        </div>

        <div>
          <Label>Trưng bày</Label>
          <Select
              value={String(formData.featured)}
              onValueChange={(value) => setFormData({...formData, featured: value === "true"})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Trưng bày"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Có</SelectItem>
              <SelectItem value="false">Không</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block mb-1 font-medium">Ảnh đại diện</Label>
          <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setSelectedFile(file)
                setPreviewUrl(URL.createObjectURL(file))
              }}
          />
        </div>

        {previewUrl && (
            <div className="flex justify-center">
              <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
              />
            </div>
        )}

        <Button onClick={handleSubmit}>Tạo danh mục</Button>
      </div>
  );
}
