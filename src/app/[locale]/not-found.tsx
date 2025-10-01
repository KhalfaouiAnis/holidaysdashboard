// "use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
// import { useTranslations } from "next-intl";

export default function NotFound() {
  // const t = useTranslations('HomePage');
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold">Page not found.</h1>
      <p className="text-muted-foreground">The page you are looking for could not be found.</p>
      <Link replace href="/dashboard/home">
        <Button variant="outline">Go back home</Button>
      </Link>
    </div>
  );
}
