"use server";

import { signIn, signOut } from "@/auth";

type formData = {
  email: string;
  password: string;
};

export async function doCredentialLogin(formData: formData) {
  try {
    console.log("called", formData);
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    console.log("response", response);
    return response;
  } catch (error: any) {
    console.log("error", error);
    return { error: "Invalid credentials" };
    // throw new Error(error);
  }
}

export async function doSignOut() {
    await signOut({ redirectTo: "/" });
}
