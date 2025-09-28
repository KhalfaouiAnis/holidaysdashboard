import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Holidays Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Holidays Admin.`,
  meta: {
    title: "Holidays Admin - Admin dashboard to manage holidays application",
    description:
      "Holidays Admin is a modern dashboard built with Next.js 15, Tailwind CSS v4, and shadcn/ui to manage the Holidays app",
  },
};
