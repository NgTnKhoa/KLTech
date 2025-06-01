import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { productService } from "@/services/product.service"
import { useNavigate } from "react-router-dom"

export default function CreateCategporyPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    discount: "",
    status: "active",
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    await productService.createProduct(formData)
    navigate("/admin")
  }

  return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">Tạo sản phẩm mới</h1>
        <Input name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} />
        <Input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} />
        <Input name="description" placeholder="Mô tả" value={formData.dwe} onChange={handleChange} />


        <Button onClick={handleSubmit}>Tạo sản phẩm</Button>
      </div>
  )
}
