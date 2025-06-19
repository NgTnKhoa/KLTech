import { DataTable } from "@/components/data-table";
import { userColumns } from "@/components/user-columns.tsx";
import { UserEditDialog } from "@/components/user-edit-dialog.tsx";
import { User } from "@/models/user.model";
import { useState } from "react";

export function UserTable({data, setData}: { data: User[], setData?: (value: (((prevState: User[]) => User[]) | User[])) => void }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false)

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
      <>
        <DataTable
            columns={userColumns}
            data={data}
            onRowClick={handleRowClick}
        />
        <UserEditDialog
            open={open}
            onClose={() => setOpen(false)}
            user={selectedUser}
            users={data}
            setUsers={setData}
        />
      </>
  );
}
