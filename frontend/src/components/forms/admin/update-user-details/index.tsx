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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UpdateUserDetailsFormSchema,
  updateUserDetailsFormSchema,
} from "./schema";
import { Switch } from "@/components/ui/switch";
import { updateUserDetailsFormSubmitAction } from "./action";

type Props = Readonly<{
  id: number;
  role: string;
  status: boolean;
}>;

export function UpdateUserDetailsForm({
  id,
  role = "user",
  status = false,
}: Props) {
  const { toast } = useToast();
  const form = useForm<UpdateUserDetailsFormSchema>({
    resolver: zodResolver(updateUserDetailsFormSchema),
    defaultValues: {
      password: "",
      role: role === "admin" ? "admin" : "user",
      status,
    },
  });

  const onSubmit = async (values: UpdateUserDetailsFormSchema) => {
    const response = await updateUserDetailsFormSubmitAction(id, values);
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
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Şifre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Yeni Şifre"
                  type="password"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Şifreniz</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kullanıcı Rolü" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="user">user</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Durum</FormLabel>
                <FormDescription></FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
