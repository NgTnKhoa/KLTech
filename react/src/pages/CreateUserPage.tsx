import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User } from "@/models/user.model"
// import { userService } from "@/services/user.service"
import { useState } from "react"

export default function CreateUserPage() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async () => {
  //   const {
  //     name,
  //     email,
  //     username,
  //     password,
  //     phoneNumber,
  //     role,
  //   } = formData;

  //   if (
  //     !name ||
  //     !email ||
  //     !username ||
  //     !password ||
  //     !phoneNumber ||
  //     !role
  //   ) {
  //     toast.error("Vui lòng điền đầy đủ thông tin trước khi gửi!");
  //     return;
  //   }

  //   try {
  //     await userService.createUser(formData)
  //     toast.info('Tạo người dùng thành công');

  //     setFormData({
  //       name: "",
  //       email: "",
  //       username: "",
  //       password: "",
  //       phoneNumber: "",
  //       role: "",
  //     });
  //   } catch (error) {
  //     toast.error("Đã có lỗi xảy ra khi tạo người dùng.");
  //     console.error(error);
  //   }
  // }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Tạo người dùng mới</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Tên</Label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} type="email" />
        </div>

        <div>
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input name="username" value={formData.username} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input name="password" value={formData.password} onChange={handleChange} type="password" />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

        <div>
          <Label>Vai trò</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">Người dùng</SelectItem>
              <SelectItem value="MANAGER">Quản lý</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="mt-4" >Tạo người dùng</Button>
    </div>
  )
}