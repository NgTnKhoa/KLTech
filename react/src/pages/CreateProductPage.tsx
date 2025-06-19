import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useEffect, useState} from "react"
import {Product, ProductRequest} from "@/models/product.model.ts";
import {toast} from "sonner"
import {Category} from "@/models/category.model.ts";
import {categoryService} from "@/services/category.service.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {fileService} from "@/services/file.service.ts";
import {productService} from "@/services/product.service.ts";
import {Label} from "@/components/ui/label.tsx";

interface CreateProductPageProps {
  setData?: (value: (((prevState: Product[]) => Product[]) | Product[])) => void
}

export default function CreateProductPage({setData}: CreateProductPageProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const availableColors: Record<string, string> = {
    red: "Đỏ",
    orange: "Cam",
    yellow: "Vàng",
    green: "Lục",
    blue: "Lam",
    indigo: "Chàm",
    purple: "Tím",
  };
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProductRequest>({
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    price: null,
    discount: null,
    status: "",
    featured: null,
    categoryId: "",
    colors: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    const {
      name,
      slug,
      description,
      price,
      discount,
      status,
      featured,
      categoryId,
      colors,
    } = formData;

    if (
        !name ||
        !slug ||
        !description ||
        price == null ||
        discount == null ||
        !status ||
        featured === null ||
        !categoryId ||
        colors.length === 0 ||
        !selectedFile
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi gửi!");
      return;
    }

    try {
      formData.thumbnail = selectedFile ? await fileService.uploadFile(selectedFile) : "";

      const newProduct = (await productService.createProduct(formData)).data
      toast.info('Tạo sản phẩm thành công');

      setFormData({
        name: "",
        slug: "",
        description: "",
        thumbnail: "",
        price: null,
        discount: null,
        status: "",
        featured: null,
        categoryId: "",
        colors: [],
      });
      setPreviewUrl('');
      setData(prev => [newProduct, ...prev]);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo sản phẩm.");
      console.error(error);
    }
  }

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    }
    getAllCategories();
  }, []);

  return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">Tạo sản phẩm mới</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input name="name" value={formData.name} onChange={handleChange}/>
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" value={formData.slug} onChange={handleChange}/>
          </div>

          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Input name="description" value={formData.description} onChange={handleChange}/>
          </div>

          <div>
            <Label htmlFor="price">Giá</Label>
            <Input name="price" value={formData.price} onChange={handleChange}/>
          </div>

          <div>
            <Label htmlFor="discount">Giảm giá</Label>
            <Input name="discount" value={formData.discount} onChange={handleChange}/>
          </div>

          <div>
            <Label>Trạng thái</Label>
            <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Đang bán</SelectItem>
                <SelectItem value="INACTIVE">Ngừng bán</SelectItem>
              </SelectContent>
            </Select>
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
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label>Màu sắc</Label>
            <div className="border rounded-md p-4 mt-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {Object.entries(availableColors).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                          id={key}
                          checked={formData.colors.includes(key)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                colors: [...formData.colors, key],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                colors: formData.colors.filter((c) => c !== key),
                              })
                            }
                          }}
                      />
                      <label htmlFor={key} className="text-sm">{value}</label>
                    </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.colors.map((color, index) => (
                  <span
                      key={index}
                      className="bg-secondary px-2 py-1 rounded-full text-sm"
                  >
                {availableColors[color]}
              </span>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label>Ảnh sản phẩm</Label>
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
            <div className="flex justify-center mt-4">
              {previewUrl && (
                  <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                  />
              )}
            </div>
          </div>
        </div>

        <Button className="mt-4" onClick={handleSubmit}>Tạo sản phẩm</Button>
      </div>
  )
}
