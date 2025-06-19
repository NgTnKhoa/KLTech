import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ForgotPasswordForm} from "@/components/forgot-password-form.tsx";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleForgotPassword = async (email: string) => {
    const response = await authService.forgotPassword(email)
    if (response.message) {
      setMessage(response.message)
    } else {
      localStorage.setItem("email", email);
      navigate("/verify-otp");
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ForgotPasswordForm
              message={message}
              onSubmit={handleForgotPassword}
          />
        </div>
      </div>
  );
};

export default ForgotPasswordPage;
