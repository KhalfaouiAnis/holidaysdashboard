"use server";

import { LoginFormType } from "@/core/schema/auth-form-schema";
import { handleServerError } from "@/lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCookieAuthToken() {
  return (await cookies()).get("auth-token")?.value || null;
}

export async function attemptLogin({ email, password }: LoginFormType) {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      email,
      password,
    });

    const { token, user } = data;

    (await cookies()).set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { token, user };
  } catch (error) {
    handleServerError(error);
    throw error;
  }
}

export async function clearCookieToken() {
  (await cookies()).delete("auth-token");
}
