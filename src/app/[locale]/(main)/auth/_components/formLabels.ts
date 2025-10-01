import { getMessages } from "next-intl/server";

export const loginFormLabels = async () => {
  const labels = await getMessages();

  return labels["AUTH"]["LOGIN_FORM"];
};

export const registerFormLabels = async () => {
  const labels = await getMessages();

  return labels["AUTH"]["REGISTER_FORM"];
};

export const authLayoutLabels = async () => {
  const labels = await getMessages();

  return labels["AUTH"];
};
