import {RegisterForm} from "@/components/register-form.tsx";
import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegister = async (formData: {
    name: string
    email: string
    username: string
    phoneNumber: string
    password: string
    role: "USER"
  }) => {
    const response = await authService.register(formData)
    if (response) {
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      navigate("/")
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm onSubmit={handleRegister}/>
        </div>
      </div>
  )
}

export default RegisterPage;
