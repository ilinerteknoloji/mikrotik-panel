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
import { addRdnsHost, updateRdnsHost } from "./actions";
import { FormAction } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

type Props = Readonly<
  | {
      type?: "create";
      id?: number;
      hostname?: string;
      hostnameMain?: string;
      status?: boolean;
    }
  | {
      type: "update";
      id: number;
      hostname: string;
      hostnameMain: string;
      status: boolean;
    }
>;

export function RDnsHostForm({
  type = "create",
  id,
  hostname,
  hostnameMain,
  status,
}: Props) {
  const { toast } = useToast();
  const form = useForm<RDnsHostForm>({
    resolver: zodResolver(rDnsHostForm),
    defaultValues: {
      host: hostname ?? "",
      hostnameMain: hostnameMain ?? "",
      status: status,
    },
  });
  const onSubmit = async (data: RDnsHostForm) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await addRdnsHost(data);
        break;
      case "update":
        response = await updateRdnsHost(id!, data);
        break;
    }
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

        {type === "update" ? (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="capitalize">
                    {field.name.replace(/([A-Z])/g, " $1").trim()}
                  </FormLabel>
                  <FormDescription />
                </div>
                <FormControl>
                  <Switch
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {type === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
