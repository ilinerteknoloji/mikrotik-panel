"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SignInFormSchema, signInFormSchema } from "./form-schema";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

export function SignInForm({}: Props) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormSchema) => {
    signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/dashboard",
    });
  };

  useEffect(() => {
    if (searchParams.get("error")) {
      setError(searchParams.get("error"));
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Kullanıcı adı"
                  autoComplete="username"
                />
              </FormControl>
              <FormDescription>
                Kullanıcı adınız, e-posta adresiniz veya telefon numaranız.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Şifre"
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Giriş Yap
        </Button>
      </form>
    </Form>
  );
}
