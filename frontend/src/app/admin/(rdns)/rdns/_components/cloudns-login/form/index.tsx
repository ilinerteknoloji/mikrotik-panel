"use client";

import { useForm } from "react-hook-form";
import {
  cloudnsLoginFormSchema,
  CloudnsLoginFormSchema,
} from "./cloudns-loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cloudnsLogin } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";

type Props = Readonly<{}>;

export function CloudnsLoginForm({}: Props) {
  const { toast } = useToast();
  const form = useForm<CloudnsLoginFormSchema>({
    resolver: zodResolver(cloudnsLoginFormSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (values: CloudnsLoginFormSchema) => {
    const response = await cloudnsLogin(values);
    if (response.status) {
      return toast({
        title: "Success",
        description: response.data,
      });
    }
    return toast({
      title: "Error",
      description: response.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ClouDNS Auth ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="ClouDNS Auth ID"
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ClouDNS Auth Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="ClouDNS Auth Password"
                  autoComplete="off"
                />
              </FormControl>
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
