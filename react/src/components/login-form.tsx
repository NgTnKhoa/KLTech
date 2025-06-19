import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {Link} from "react-router-dom";
import {z} from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit?: (data: LoginFormData) => void,
  className?: string,
  message?: string
};

const loginSchema = z.object({
  username: z.string().min(3, "Username phải có ít nhất 3 kí tự"),
  password: z.string().min(5, "Password phải có ít nhất 5 kí tự"),
});

export function LoginForm({className, onSubmit, message}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    [key in keyof LoginFormData]?: string;
  }>({});

  const handleChange =
      (field: keyof LoginFormData) =>
          (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({...prev, [field]: e.target.value}));
            setErrors((pre) => ({...pre, [field]: undefined}));
          };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse(formData);
      onSubmit?.(validatedData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key in keyof LoginFormData]?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
  return (
      <div className={cn("flex flex-col gap-6", className)}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                      id="username"
                      type="username"
                      placeholder="ngvana"
                      required
                      value={formData.username}
                      onChange={handleChange("username")}
                  />
                  {errors.username && (
                      <p className="text-xs text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        to="/forgot-password"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange("password")}
                  />
                </div>
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                )}
                {message && (
                    <p className="text-xs text-red-500">{message}</p>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                  // src="/placeholder.svg"
                  src="/img/login.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
  );
}
