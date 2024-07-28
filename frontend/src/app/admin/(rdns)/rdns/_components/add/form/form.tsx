"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { rDnsHostForm, type RDnsHostForm } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addRdnsHost } from "./actions";

type Props = Readonly<{}>;

export function RDnsHostForm({}: Props) {
  const { toast } = useToast();
  const form = useForm<RDnsHostForm>({
    resolver: zodResolver(rDnsHostForm),
    defaultValues: {
      host: "",
      hostnameMain: "",
    },
  });
  const onSubmit = async (data: RDnsHostForm) => {
    const response = await addRdnsHost(data);
    if (!response.status)
      return toast({
        title: "Error",
        description: response.message,
      });
    form.reset();
    toast({
      title: "Success",
      description: response.data,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {rDnsHostForm.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="RDns Host" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hostnameMain"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {rDnsHostForm.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={
                    form.getValues("host")
                      ? `${form.getValues("host").split(".")[2]}.${form.getValues("host").split(".")[1]}.${form.getValues("host").split(".")[0]}`
                      : "RDns Hostname Main"
                  }
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
