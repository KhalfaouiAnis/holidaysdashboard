import { LoginForm } from "../../_components/login-form";
import { loginFormLabels } from "../../_components/formLabels";

export default async function Login() {
  const formLabels = await loginFormLabels()

  return <LoginForm labels={formLabels} />
}
