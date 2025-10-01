"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginLogic } from "@/hooks/use-auth-logic";
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

export function LoginForm({ labels }: { labels: Record<string, string> }) {
  const { form, handleLogin } = useLoginLogic()
  const { control, handleSubmit, formState } = form

  return (
    <>
      <div className="space-y-4 text-center">
        <div className="font-medium tracking-tight">{labels["login"]}</div>
        <div className="text-muted-foreground mx-auto max-w-xl">
          {labels["welcomeBack"]}
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormControl>
                    <Checkbox
                      id="login-remember"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="size-4"
                    />
                  </FormControl>
                  <FormLabel htmlFor="login-remember" className="text-muted-foreground ml-1 text-sm font-medium">
                    {labels["rememberMe"]}
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formState.isSubmitting ? labels["loadingText"] : labels["loginBtnLabel"]}
            </Button>
          </form>
        </Form>
        <p className="text-muted-foreground text-center text-xs">
          {labels["noAccount"]}{" "}
          <Link href="register" className="text-primary">
            {labels["register"]}
          </Link>
        </p>
      </div>
    </>
  );
}
