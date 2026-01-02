"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUpFormSubmitAction } from "./actions";
import { SignUpFormSchema, signUpFormSchema } from "./form-schema";

type Props = {};

export function SignUpForm({}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    const response = await signUpFormSubmitAction(values);
    if (!response.status) {
      return toast({
        title: "Error",
        description: response.message,
      });
    }
    return router.push("/sign-in");
  };

  return (
    <Form {...form}>
      <form
        action="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ad"
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Soyad"
                    autoComplete="family-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Kullanıcı Adı"
                  autoComplete="username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="E-Mail"
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon Numarası</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Telefon Numarası"
                  autoComplete="tel"
                />
              </FormControl>
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
                  autoComplete="new-password"
                />
              </FormControl>
              {field.value.length > 0 ? (
                <FormMessage>
                  {!field.value.match(/(?=.*[a-z])/) ? (
                    <span>Şifre en az bir küçük harf içermelidir.</span>
                  ) : null}

                  {!field.value.match(/(?=.*[A-Z])/) ? (
                    <span>Şifre en az bir büyük harf içermelidir.</span>
                  ) : null}

                  {!field.value.match(/(?=.*\d)/) ? (
                    <span>Şifre en az bir rakam içermelidir.</span>
                  ) : null}

                  {!field.value.match(/(?=.*[@$!%*?&])/) ? (
                    <span>Şifre en az bir özel karakter içermelidir.</span>
                  ) : null}

                  {!field.value.match(/^.{8,30}$/) ? (
                    <span>Şifre 8 ila 30 karakter uzunluğunda olmalıdır.</span>
                  ) : null}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Kayıt Ol
        </Button>
      </form>
    </Form>
  );
}
