import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {VerifyOTPForm} from "@/components/verify-otp-form.tsx";
import {ChangePasswordForm} from "@/components/change-password-form.tsx";
import {ChangePassword} from "@/models/auth.model.ts";
import {toast} from "sonner";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleChangePassword = async (changePassword: ChangePassword, email: string) => {
    const response = await authService.changePassword(changePassword, email)
    if (response.message) {
      setMessage(response.message)
    } else {
      toast.success("Password changed successfully.");
      navigate("/login");
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ChangePasswordForm
              message={message}
              onSubmit={handleChangePassword}
          />
        </div>
      </div>
  );
};

export default ChangePasswordPage;
