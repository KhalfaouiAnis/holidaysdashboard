import { toast } from "sonner";
import { LoginFormSchema, LoginFormType, SignupFormSchema, SignupFormType } from "@/core/schema/auth-form-schema";
import useAuth from "@/stores/auth/auth";
import { client } from "@/core/api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attemptLogin } from "@/server/user/auth";
import { useRouter } from "@/i18n/navigation";
import { handleClientError } from "@/lib/utils";

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

      router.push("/dashboard/home");
      toast.success("Welcome to holidays!");
    } catch (error) {
      handleClientError(error);
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
      const { token, user } = await attemptLogin(values);
      setUser(user);
      signIn(token);
      router.push("/dashboard/home");
    } catch (error) {
      handleClientError(error);
    }
  };

  return { form, handleLogin };
};
