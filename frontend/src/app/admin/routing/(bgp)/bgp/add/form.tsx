"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateBgpConnectionFormSchema,
  createBgpConnectionFormSchema,
  localRoleValues,
} from "./schema";
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
import { Switch } from "@/components/ui/switch";
import { addRoutingBgpConnection, updateRoutingBgpConnection } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormAction } from "@/lib/types";

type Props = Readonly<
  {
    templates: string[];
  } & (
    | {
        type?: "create";
        id?: string;
        formData?: CreateBgpConnectionFormSchema;
      }
    | {
        type?: "update";
        id: string;
        formData: CreateBgpConnectionFormSchema;
      }
  )
>;

export function RoutingBGPConnectionAddForm({
  templates,
  type = "create",
  formData,
  id,
}: Props) {
  const { toast } = useToast();
  const form = useForm<CreateBgpConnectionFormSchema>({
    resolver: zodResolver(createBgpConnectionFormSchema),
    defaultValues: {
      name: formData?.name ?? "",
      connect: formData?.connect ?? true,
      listen: formData?.listen ?? true,
      localAddress: formData?.localAddress ?? "::",
      localPort: formData?.localPort ?? 179,
      localRole: formData?.localRole ?? undefined,
      localTtl: formData?.localTtl ?? undefined,
      remoteAddress: formData?.remoteAddress ?? "::",
      remotePort: formData?.remotePort ?? 179,
      remoteAs: formData?.remoteAs ?? undefined,
      allowedAs: formData?.allowedAs ?? undefined,
      remoteTtl: formData?.remoteTtl ?? undefined,
      tcpMd5Key: formData?.tcpMd5Key ?? undefined,
      templates: formData?.templates ?? "default",
    },
  });
  const onSubmit = async (data: CreateBgpConnectionFormSchema) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await addRoutingBgpConnection(data);
        break;
      case "update":
        response = await updateRoutingBgpConnection(id!, data);
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
                {createBgpConnectionFormSchema.shape[field.name].isOptional()
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
          name="connect"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {createBgpConnectionFormSchema.shape[field.name].isOptional()
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
          name="listen"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {createBgpConnectionFormSchema.shape[field.name].isOptional()
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
        <Accordion type="single" collapsible defaultValue="local">
          <AccordionItem value="local">
            <AccordionTrigger>Local</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="localAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="localPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="localRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
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
                            placeholder={field.name
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {localRoleValues.map((value) => (
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
              <FormField
                control={form.control}
                name="localTtl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                        className="capitalize"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="remote">
            <AccordionTrigger>Remote</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="remoteAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="remotePort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="remoteAs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="allowedAs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
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
                name="remoteTtl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {createBgpConnectionFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                        className="capitalize"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <FormField
          control={form.control}
          name="tcpMd5Key"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {createBgpConnectionFormSchema.shape[field.name].isOptional()
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
          name="templates"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {createBgpConnectionFormSchema.shape[field.name].isOptional()
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
                  {templates.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="capitalize"
                    >
                      {value}
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
