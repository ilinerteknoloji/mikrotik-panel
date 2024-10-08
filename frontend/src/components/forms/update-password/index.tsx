"use client";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { updatePasswordFormSchema, UpdatePasswordFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { updatePasswordFormSubmitAction } from "./actions";

type Props = Readonly<{
  id: number;
}>;

export function UpdatePassword({ id }: Props) {
  const { toast } = useToast();
  const form = useForm<UpdatePasswordFormSchema>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordFormSchema) => {
    const response = await updatePasswordFormSubmitAction(id, values);
    if (!response.status) {
      return toast({
        title: "Error",
        description: response.message,
      });
    }
    return toast({
      title: "Başarılı",
      description: response.data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifreniz</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Şifreniz"
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Şifreniz</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Yeni Şifreniz"
                  type="password"
                  autoComplete="new-password"
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
          Güncelle
        </Button>
      </form>
    </Form>
  );
}
