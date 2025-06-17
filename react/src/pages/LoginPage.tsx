import {LoginForm} from "@/components/login-form.tsx";
import {authService} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData: {
    username: string
    password: string
  }) => {
    const response = await authService.login(formData)
    if (response) {
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
          <LoginForm
              onSubmit={handleLogin}
          />
        </div>
      </div>
  );
};

export default LoginPage;
