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

type VerifyOTPFormProps = {
  onSubmit?: (otp: number, email: string) => void,
  className?: string,
  message?: string
};

export function VerifyOTPForm({className, onSubmit, message}: VerifyOTPFormProps) {
  const [otp, setOtp] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) return;
    onSubmit?.(parseInt(otp), localStorage.getItem("email") || "");
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
                  <InputOTP
                      maxLength={6}
                      type={"number"}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0}/>
                      <InputOTPSlot index={1}/>
                      <InputOTPSlot index={2}/>
                    </InputOTPGroup>
                    <InputOTPSeparator/>
                    <InputOTPGroup>
                      <InputOTPSlot index={3}/>
                      <InputOTPSlot index={4}/>
                      <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                  </InputOTP>
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
