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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUserIpFormSchema, UpdateUserIpFormSchema } from "./schama";
import { updateUserIpFormSubmitSchema } from "./actions";

type Props = Readonly<{
  id: string;
  ip: string;
  status: boolean;
}>;

export function UpdateUserIpForm({ id, ip, status }: Props) {
  const { toast } = useToast();
  const form = useForm<UpdateUserIpFormSchema>({
    resolver: zodResolver(updateUserIpFormSchema),
    defaultValues: {
      status,
    },
  });

  const onChange = async () => {
    const response = await updateUserIpFormSubmitSchema(id, form.getValues());
    if (!response.status) {
      return toast({
        title: "Error",
        description: response.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Durum</FormLabel>
                <FormDescription></FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    onChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
