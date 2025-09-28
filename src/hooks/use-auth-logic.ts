import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

import { LoginFormSchema, LoginFormType, SignupFormSchema, SignupFormType } from "@/core/schema/auth-form-schema";
import useAuth from "@/stores/auth/auth";
import { client } from "@/core/api/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attemptLogin } from "@/server/user/auth";

export const useSignUpLogic = () => {
  const { signIn, setUser } = useAuth();
  const router = useRouter();
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (values: SignupFormType) => {
    try {
      await client.post("users", values);

      const { data } = await client.post("users/login", { email: values.email, password: values.password });

      setUser(data.user);
      signIn(data.token);

      router.push("/");
      toast.success("Welcome to holidays!");
    } catch (error) {
      const err = error as Error | AxiosError;
      if (isAxiosError(err)) {
        const message = err?.response?.data?.message ? err?.response?.data?.message : err?.response?.data;
        toast.error(message);
      } else {
        toast.error(err.message);
        console.debug(err);
      }
    }
  };

  return { form, handleRegister };
};

export const useLoginLogic = () => {
  const { signIn, setUser } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleLogin = async (values: LoginFormType) => {
    try {
      const { token, user } = await attemptLogin(values)
      setUser(user);
      signIn(token);
      router.push("/");
    } catch (error) {
      const err = error as Error | AxiosError;
      if (isAxiosError(err)) {
        const message = err?.response?.data?.message ? err?.response?.data?.message : err?.response?.data;
        toast.error(message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return { form, handleLogin };
};
