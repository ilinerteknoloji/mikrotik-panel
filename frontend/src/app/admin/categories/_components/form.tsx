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
import { ipCategoriesFormSchema, IpCategoriesFormSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormAction } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { addIpCategoryAction, updateIpCategoryAction } from "./actions";

type Props = Readonly<
  | {
      type?: "create";
      id?: string;
      category?: IpCategoriesFormSchema;
    }
  | {
      type?: "update";
      id: string;
      category: IpCategoriesFormSchema;
    }
>;

export function IpCategoriesForm({ type = "create", id, category }: Props) {
  const { toast } = useToast();
  const form = useForm<IpCategoriesFormSchema>({
    resolver: zodResolver(ipCategoriesFormSchema),
    defaultValues: {
      title: category?.title ?? "",
      description: category?.description ?? "",
      status: category?.status ?? true,
    },
  });

  const submitHandler = form.handleSubmit(async (data) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await addIpCategoryAction(data);
        break;
      case "update":
        response = await updateIpCategoryAction(id!, data);
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
  });

  return (
    <Form {...form}>
      <form onSubmit={submitHandler} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipCategoriesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipCategoriesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
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
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {ipCategoriesFormSchema.shape[field.name].isOptional()
                    ? "?"
                    : ""}
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
