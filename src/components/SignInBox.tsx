"use client";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { doCredentialLogin } from "@/app/actions";
type Props = {};
type UserType = "student" | "recruiter" | "admin";
type User = {
  email: string;
  rollNo?: string;
  companyName?: string;
  password: string;
  userType: UserType;
};

const SignInBox = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, SetRememberMe] = useState(false)
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogIn = async () => {
    console.log(email, password);
    // axios
    // .post(`${process.env.NEXT_PUBLIC_API_KEY}/log-in`, {
    //     email,
    //     password,
    // }).then((response) => {
    //     if (response.status === 200) {
    //         enqueueSnackbar("Logged in successfully", { variant: "success" });
    //         router.push("/student/home");
    //     }
    // }).catch((error) => {
    //     enqueueSnackbar("Invalid credentials", { variant: "error" });
    // });
    const response = await doCredentialLogin({ email, password });
    if (!!response.error) {
      enqueueSnackbar(response.error, { variant: "error" });
      return;
    } else {
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      router.push("/student/profile");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className=" p-4 px-4 md:px-10 flex flex-col justify-evenly mx-2 h-full bg-white rounded-lg shadow-lg text-xl col-span-12 md:col-span-5 overflow-y-scroll">
        <div className="p-2 md:p-6">
          <h1 className="text-xl text-gray-500">Welcome back to</h1>
          <p className="font-bold text-4xl text-emerald-600">SIP Portal</p>
        </div>
        <Card className="border-0 shadow-none flex-grow">
          <CardHeader className="p-2 md:p-6">
            <CardTitle className="text-2xl font-bold">Log In</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@iitk.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility()}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="flex flex-row flex-between w-full relative mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberUser"
                      name="rememberUser"
                      checked={rememberMe}
                      onCheckedChange={(checked) => SetRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="recruiterAcceptPolicy" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-emerald-500 text-sm hover:underline ml-auto"
                  >
                    Forgot Password?
                  </Link>
                </div>
            <div className="flex justify-between mt-6">
              <Button onClick={handleLogIn} className="ml-auto">
                Log In
              </Button>
            </div>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Not yet registered?{" "}
            <Link href="/sign-up" className="text-emerald-500 hover:underline">
              Sign Up!
            </Link>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignInBox;
