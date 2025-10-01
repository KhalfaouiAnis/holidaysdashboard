"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUpLogic } from "@/hooks/use-auth-logic";
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

export function RegisterForm({ labels }: { labels: Record<string, string> }) {
  const { form, handleRegister } = useSignUpLogic()
  const { control, handleSubmit, formState } = form

  return (
    <div>
      <div className="space-y-4 text-center">
        <div className="font-medium tracking-tight">{labels["register"]}</div>
        <div className="text-muted-foreground mx-auto max-w-xl">{labels["createAccount"]}</div>
      </div>
      <div className="space-y-4 mt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels["name"]}</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" placeholder={labels["name"]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels["email"]}</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder={labels["email"]} autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels["password"]}</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="••••••••" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels["confirmPassword"]}</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formState.isSubmitting ? labels["loadingText"] : labels["registerBtnLabel"]}
            </Button>
          </form>
        </Form>
        <p className="text-muted-foreground text-center text-xs">
          {labels["alreadyRegistered"]}{" "}
          <Link href="login" className="text-primary">
            {labels["login"]}
          </Link>
        </p>
      </div>
    </div>
  );
}
