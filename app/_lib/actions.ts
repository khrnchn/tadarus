"use server";

import { signIn } from "@/auth";

export async function handleSignIn() {
  const res = await signIn("google", { redirectTo: "/dashboard" });

  return res;
}
