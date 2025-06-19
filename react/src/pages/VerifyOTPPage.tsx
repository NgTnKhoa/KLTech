import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ForgotPasswordForm} from "@/components/forgot-password-form.tsx";
import {VerifyOTPForm} from "@/components/verify-otp-form.tsx";

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleVerifyOTP = async (otp: number, email: string) => {
    const response = await authService.verifyOTP(otp, email)
    if (response.message) {
      setMessage(response.message)
    } else {
      navigate("/change-password");
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <VerifyOTPForm
              message={message}
              onSubmit={handleVerifyOTP}
          />
        </div>
      </div>
  );
};

export default VerifyOTPPage;
