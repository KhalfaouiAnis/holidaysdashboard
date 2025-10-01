import { RegisterForm } from "../../_components/register-form";
import { registerFormLabels } from "../../_components/formLabels";

export default async function Register() {
  const formLabels = await registerFormLabels()

  return <RegisterForm labels={formLabels} />
}
