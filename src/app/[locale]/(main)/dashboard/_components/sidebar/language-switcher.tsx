"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Locale, useLocale } from "next-intl";
import { useTransition } from 'react';
import { useParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import clsx from "clsx";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();

  const onSelectChange = (value: any) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: value as Locale }
      );
    });
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale} value={locale}>
      <SelectTrigger>
        <Languages className="size-5" />
      </SelectTrigger>
      <SelectContent
        className={clsx(
          'space-y-1',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
      >
        <SelectGroup>
          {
            routing.locales.map(local => (
              <SelectItem key={local} value={local}>
                <SelectLabel>
                  {local}
                </SelectLabel>
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
