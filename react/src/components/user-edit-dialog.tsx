import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { User } from "@/models/user.model.ts"
// import { userService } from "@/services/user.service.ts"
import { useState } from "react"
import { toast } from "sonner"

interface UserEditDialogProps {
  open: boolean
  onClose: () => void
  user: User | null
  users: User[]
  setUsers: (users: User[]) => void
}

export function UserEditDialog({open, onClose, user, users, setUsers}: UserEditDialogProps) {
  const [formData, setFormData] = useState<User | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // useEffect(() => {
  //   if (user) {
  //     setPreviewUrl('http://localhost:80/api/v1/files/' + user?.avatar)
  //     setFormData(user)
  //   }
  // }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!formData) return

    // const newAvatar = selectedFile ? await fileService.uploadFile(selectedFile) : ""

    // if (newAvatar !== "") {
    //   formData.avatar = newAvatar
    // }

    // await userService.updateUser(formData.id, formData)
    // setUsers(users.map(u => u.id === formData.id ? formData : u))
    onClose()

    toast.info("Cập nhật người dùng thành công")
  }

  if (!formData) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên người dùng</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên người dùng"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData((prev) => ({...prev, role: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={String(formData.active)}
              onValueChange={(value) => setFormData((prev) => ({...prev, active: value === "true"}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Hoạt động</SelectItem>
                <SelectItem value="false">Đã khóa</SelectItem>
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
                  className="w-32 h-32 object-cover rounded-full border"
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