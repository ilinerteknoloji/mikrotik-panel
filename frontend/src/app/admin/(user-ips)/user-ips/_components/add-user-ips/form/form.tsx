"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddUserIpsSchema, addUserIpsSchema } from "./schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsernamesSchema } from "@/lib/schema/response/user/user.schema";
import { Textarea } from "@/components/ui/textarea";
import { addUserIps } from "./actions";
import { useToast } from "@/components/ui/use-toast";

type Props = Readonly<{
  usernames: UsernamesSchema;
}>;

export function AddUserIpsForm({ usernames }: Props) {
  const { toast } = useToast();
  const form = useForm<AddUserIpsSchema>({
    resolver: zodResolver(addUserIpsSchema),
    defaultValues: {
      userId: "",
      ips: "",
    },
  });

  const onSubmit = async (data: AddUserIpsSchema) => {
    const response = await addUserIps(data);
    if (!response.status)
      return toast({
        title: "Error",
        description: response.message,
      });
    form.reset();
    return toast({
      title: "Success",
      description: response.data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {addUserIpsSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usernames.map(({ id, username }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ips"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {addUserIpsSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter IPs"
                  className="resize-none"
                  {...field}
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
