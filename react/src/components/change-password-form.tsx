import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {Link} from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {ChangePassword} from "@/models/auth.model.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

type ChangePasswordFormProps = {
  onSubmit?: (changePassword: ChangePassword, email: string) => void,
  className?: string,
  message?: string
};

export function ChangePasswordForm({className, onSubmit, message}: ChangePasswordFormProps) {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changePassword: ChangePassword = {
      password: password,
      repeatPassword: repeatPassword
    }

    onSubmit(changePassword, localStorage.getItem("email"));
  };
  return (
      <div className={cn("flex flex-col gap-6", className)}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Verify OTP</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your verify OTP
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Repeat password</Label>
                  </div>
                  <Input
                      id="password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                {message && (
                    <p className="text-xs text-red-500">{message}</p>
                )}
                <Button type="submit" className="w-full">
                  Confirm
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
