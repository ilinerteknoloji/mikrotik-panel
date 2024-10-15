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
import { queueFormSchema, QueueFormSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addQueue, updateQueue } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { FormAction } from "@/lib/types";

type Props = Readonly<
  | { type?: "create"; id?: string; formData?: QueueFormSchema }
  | { type?: "update"; id: string; formData: QueueFormSchema }
>;

export function QueueForm({ type = "create", id, formData }: Props) {
  const form = useForm<QueueFormSchema>({
    resolver: zodResolver(queueFormSchema),
    defaultValues: {
      name: formData?.name ?? "",
      target: formData?.target ?? "",
      maxLimit: formData?.maxLimit ?? "",
      limitAt: formData?.limitAt ?? "",
      priority: formData?.priority ?? 8,
    },
  });

  const onSubmit = async (data: QueueFormSchema) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await addQueue(data);
        break;
      case "update":
        response = await updateQueue(id!, data);
        break;
    }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {queueFormSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {queueFormSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {queueFormSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limitAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {queueFormSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {queueFormSchema.shape[field.name].isOptional() ? "?" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
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
          {type === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
