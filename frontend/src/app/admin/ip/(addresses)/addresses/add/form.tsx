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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ipAddressesAddAction, ipAddressesUpdateAction } from "./actions";
import { ipAddressesFormSchema, IpAddressesFormSchema } from "./schema";
import { FormAction } from "@/lib/types";

type Props = Readonly<
  {
    interfaceNames: string[];
  } & (
    | {
        type?: "create";
        id?: string;
        formData?: IpAddressesFormSchema;
      }
    | {
        type?: "update";
        id: string;
        formData: IpAddressesFormSchema;
      }
  )
>;

export function IpAddressesForm({
  interfaceNames,
  type = "create",
  id,
  formData,
}: Props) {
  const { toast } = useToast();
  const form = useForm<IpAddressesFormSchema>({
    resolver: zodResolver(ipAddressesFormSchema),
    defaultValues: {
      address: formData?.address ?? "",
      //   advertise: false,
      comment: formData?.comment ?? "",
      disabled: formData?.disabled ?? false,
      //   eui64: false,
      //   fromPool: "",
      //   noDad: false,
      interface: formData?.interface ?? "",
    },
  });
  const onSubmit = async (data: IpAddressesFormSchema) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await ipAddressesAddAction(data);
        break;
      case "update":
        response = await ipAddressesUpdateAction(id!, data);
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipAddressesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
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
          name="disabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {ipAddressesFormSchema.shape[field.name].isOptional()
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
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipAddressesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
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
        {/* <FormField
          control={form.control}
          name="advertise"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {ipAddressesFormSchema.shape[field.name].isOptional()
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
        /> */}
        {/* <FormField
          control={form.control}
          name="eui64"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {ipAddressesFormSchema.shape[field.name].isOptional()
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
        /> */}
        {/* <FormField
          control={form.control}
          name="fromPool"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipAddressesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
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
        /> */}
        {/* <FormField
          control={form.control}
          name="noDad"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {ipAddressesFormSchema.shape[field.name].isOptional()
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
        /> */}
        <FormField
          control={form.control}
          name="interface"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {ipAddressesFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue
                      className="capitalize"
                      placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {interfaceNames.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="capitalize"
                    >
                      {value.replaceAll("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
