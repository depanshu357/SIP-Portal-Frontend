"use client";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
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
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {};

const AdminSignUpBox = (props: Props) => {
  const [step, setStep] = useState<number>(1);
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      // check if email is valid and of the form iitk.ac.in
      if (email === "") {
        enqueueSnackbar("Please enter an email", { variant: "error" });
        return;
      }
      // console.log(email, rollNo, companyName, process.env.API_KEY)
      setLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_KEY}/send-otp`, { email: email })
        .then((res) => {
          console.log(res.data);
          const msg = res.data.message ?? "OTP sent successfully";
          enqueueSnackbar(msg, { variant: "success" });
          enqueueSnackbar("OTP is valid for 10 minutes", { variant: "info" });
          if (step < 3) setStep((prev) => prev + 1);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err.response?.data?.error ?? "Error sending OTP", {
            variant: "error",
          });
          setLoading(false);
        });
    } else if (step === 2) {
      if (otp.length !== 6) {
        enqueueSnackbar("Please enter a valid OTP", { variant: "error" });
        return;
      }
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_KEY}/verify-otp`, {
          email: email,
          otp: otp,
        })
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
          if (step < 3) setStep((prev) => prev + 1);
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar(err.response?.data?.error ?? "Failed to verify OTP", {
            variant: "error",
          });
          setLoading(false);
        });
    } else if (step === 3) {
      if (password === "" || confirmPassword === "") {
        enqueueSnackbar("Please fill all the fields", { variant: "error" });
        return;
      } else if (password !== confirmPassword) {
        enqueueSnackbar("Passwords do not match", { variant: "error" });
        return;
      } else if (password.length < 6) {
        enqueueSnackbar("Password should be at least 6 characters long", {
          variant: "error",
        });
        return;
      }
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_KEY}/sign-up`, {
          email: email,
          password: password,
          role: userType,
        })
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
          setLoading(false);
          router.push("/student/home");
        })
        .catch((err) => {
          enqueueSnackbar(err.response?.data?.error ?? "Failed to sign up", {
            variant: "error",
          });
          setLoading(false);
        });
    }
    // if (step < 3) setStep(step + 1)
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className=" p-4 px-4 md:px-10 flex flex-col justify-evenly mx-2 h-full bg-white rounded-lg shadow-lg text-xl col-span-12 md:col-span-5 overflow-y-scroll">
        <div className="p-2 md:p-6">
          <h1 className="text-xl text-gray-500">Welcome to</h1>
          <p className="font-bold text-4xl text-emerald-600">SIP Portal</p>
        </div>
        <Card className="border-0 shadow-none flex-grow">
          <CardHeader className="p-2 md:p-6">
            <CardTitle className="text-2xl font-bold">Admin Sign Up</CardTitle>
            <CardDescription>
              Request for admin access to the SIP Portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            {step === 1 && (
              <div>
                <div className="space-y-4 h-[170px]">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="username@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  We've sent a verification code to your email: {email}
                </p>
                <div className="space-y-2 flex justify-center min-h-24 h-[170px]">
                  {/* <Label htmlFor="verification-code">Verification Code</Label>
                  <Input id="verification-code" placeholder="Enter the 6-digit code" /> */}
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 min-h-24 h-[220px]">
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
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      // className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="ml-auto"
                disabled={loading}
              >
                {step === 1
                  ? "Send OTP"
                  : step === 2
                  ? "Verify"
                  : "Create Account"}
              </Button>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center max-w-md mx-auto">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className="flex flex-row gap-1 items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNumber
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <div className="text-xs mt-1">
                      {stepNumber === 1
                        ? "Details"
                        : stepNumber === 2
                        ? "Verify Email"
                        : "Password"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-emerald-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminSignUpBox;
