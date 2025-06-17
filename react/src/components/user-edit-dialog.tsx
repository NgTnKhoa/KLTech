import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { User } from "@/models/user.model"
import {useEffect, useState} from "react"
import { toast } from "sonner"
import {userService} from "@/services/user.service.ts";

interface UserEditDialogProps {
  open: boolean
  onClose: () => void
  user: User | null
  users: User[]
  setUsers: (users: User[]) => void
}

export function UserEditDialog({open, onClose, user, users, setUsers}: UserEditDialogProps) {
  const [formData, setFormData] = useState<User>(null)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = async (type: string) => {
    if (type === "update") {
      if (!formData) return
      const user: User = await userService.updateUser(formData.id, formData);
      setUsers(users.map(u => u.id === formData.id ? user : u))
      onClose();
      toast.info("Cập nhật người dùng thành công")
    } else {
      await userService.deleteUser(user.id);
      setUsers(users.filter(u => u.id !== user.id))
      setConfirmOpen(false);
      onClose();
      toast.info("Xóa người dùng thành công")
    }
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
        </div>

        <DialogFooter>
          <Button onClick={() => setConfirmOpen(true)} className="bg-red-500">Xóa</Button>
          <Button onClick={() => handleSubmit("update")}>Lưu thay đổi</Button>
        </DialogFooter>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có chắc chắn muốn xóa người dùng này?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Hủy</Button>
              <Button
                  className="bg-red-600"
                  onClick={() => handleSubmit("delete")}
              >
                Xóa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}