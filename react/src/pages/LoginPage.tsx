import {LoginForm} from "@/components/login-form.tsx";
import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleLogin = async (formData: {
    username: string
    password: string
  }) => {
    const response = await authService.login(formData)
    if (response.message) {
      setMessage(response.message)
    } else {
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("id", response.id)
      localStorage.setItem("username", response.username)
      localStorage.setItem("role", response.role)
      const role = response.role
      if (role === "ADMIN") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    }
  }

  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm
              message={message}
              onSubmit={handleLogin}
          />
        </div>
      </div>
  );
};

export default LoginPage;
