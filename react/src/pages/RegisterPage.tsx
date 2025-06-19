import {RegisterForm} from "@/components/register-form.tsx";
import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleRegister = async (formData: {
    name: string
    email: string
    username: string
    phoneNumber: string
    password: string
    role: "USER"
  }) => {
    const response = await authService.register(formData)
    if (response.message) {
      setMessage(response.message);
    } else {
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("id", response.id)
      localStorage.setItem("username", response.username)
      localStorage.setItem("role", response.role)
      navigate("/")
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm
              message={message}
              onSubmit={handleRegister}
          />
        </div>
      </div>
  )
}

export default RegisterPage;
