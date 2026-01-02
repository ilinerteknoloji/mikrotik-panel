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
import { useForm } from "react-hook-form";
import { updateProfileFormSubmitAction } from "./actions";
import { updateProfileFormSchema, UpdateProfileFormSchema } from "./schema";

type Props = {
  id: number;
  user: UpdateProfileFormSchema;
};

export function UpdateProfileForm({ id, user }: Props) {
  const { toast } = useToast();
  const form = useForm<UpdateProfileFormSchema>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const onSubmit = async (values: UpdateProfileFormSchema) => {
    const response = await updateProfileFormSubmitAction(id, values);
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
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ad" />
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
              <FormLabel>Soyadı</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Soyadı" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Kullanıcı Adı" />
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
              <FormLabel>E-Posta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E-Posta" />
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
                <Input {...field} placeholder="Telefon Numarası" />
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
