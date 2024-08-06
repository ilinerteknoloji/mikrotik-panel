"use client";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  addPathOutValues,
  addressFamiliesValues,
  affinityValues,
  ciscoVplsNlriLenFmtValues,
  defaultOriginateValues,
  nexthopChoiceValues,
  routingBgpTemplatesAddFormSchema,
  RoutingBgpTemplatesAddFormSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { addRoutingBgpTemplate } from "./actions";

type Props = Readonly<{}>;

export function RoutingBGPTemplateAddForm({}: Props) {
  const { toast } = useToast();
  const form = useForm<RoutingBgpTemplatesAddFormSchema>({
    resolver: zodResolver(routingBgpTemplatesAddFormSchema),
    defaultValues: {
      addPathOut: "none",
      addressFamilies: "ip",
      as: undefined,
      asOverride: false,
      ciscoVplsNlriLenFmt: undefined,
      clusterId: "",
      disabled: false,
      holdTime: "3m",
      acceptCommunities: "",
      acceptExtCommunities: "",
      acceptLargeCommunities: "",
      acceptNlri: "",
      acceptUnknown: "",
      affinity: "alone",
      allowAs: undefined,
      filter: "",
      ignoreAsPathLen: false,
      limitNlriDiversity: undefined,
      limitProcessRoutesIpv4: undefined,
      limitProcessRoutesIpv6: undefined,
      keepaliveTime: "3m",
      multihop: false,
      name: "",
      nexthopChoice: "default",
      outputAffinity: "",
      defaultOriginate: "never",
      defaultPrepend: undefined,
      filterChain: "",
      filterSelect: "",
      keepSentAttributes: false,
      network: "",
      noClientToClientReflection: false,
      noEarlyCut: false,
      redistribute: "",
      removePrivateAs: false,
      routerId: "main",
      routingTable: "",
      saveTo: "",
      templates: "",
      useBfd: false,
      vrf: "main",
    },
  });

  const onSubmit = async (data: RoutingBgpTemplatesAddFormSchema) => {
    const response = await addRoutingBgpTemplate(data);
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
          name="disabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {routingBgpTemplatesAddFormSchema.shape[
                    field.name
                  ].isOptional()
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
        />{" "}
        <FormField
          control={form.control}
          name="addPathOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
                  {addPathOutValues.map((value) => (
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
        <FormField
          control={form.control}
          name="addressFamilies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
                  {addressFamiliesValues.map((value) => (
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
        <FormField
          control={form.control}
          name="as"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
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
          name="asOverride"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {routingBgpTemplatesAddFormSchema.shape[
                    field.name
                  ].isOptional()
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
          name="ciscoVplsNlriLenFmt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
                  {ciscoVplsNlriLenFmtValues.map((value) => (
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
        <FormField
          control={form.control}
          name="clusterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
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
          name="holdTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                  className="capitalize"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible defaultValue="input">
          <AccordionItem value="input">
            <AccordionTrigger>Input</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="acceptCommunities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptExtCommunities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptLargeCommunities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptNlri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptUnknown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affinity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <Select name={field.name} onValueChange={field.onChange}>
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
                        {affinityValues.map((value) => (
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
              <FormField
                control={form.control}
                name="allowAs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="filter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ignoreAsPathLen"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {routingBgpTemplatesAddFormSchema.shape[
                          field.name
                        ].isOptional()
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
                name="limitNlriDiversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="limitProcessRoutesIpv4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="limitProcessRoutesIpv6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
          name="keepaliveTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
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
          name="multihop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {routingBgpTemplatesAddFormSchema.shape[
                    field.name
                  ].isOptional()
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
          name="nexthopChoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
                  ? "?"
                  : ""}
              </FormLabel>
              <Select name={field.name} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue
                      className="capitalize"
                      placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nexthopChoiceValues.map((value) => (
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
        <Accordion type="single" collapsible defaultValue="output">
          <AccordionItem value="output">
            <AccordionTrigger>Output</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="outputAffinity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                name="defaultOriginate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
                        field.name
                      ].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <Select name={field.name} onValueChange={field.onChange}>
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
                        {defaultOriginateValues.map((value) => (
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
              <FormField
                control={form.control}
                name="defaultPrepend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                name="filterChain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                name="filterSelect"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                name="keepSentAttributes"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {routingBgpTemplatesAddFormSchema.shape[
                          field.name
                        ].isOptional()
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
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
                name="noClientToClientReflection"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {routingBgpTemplatesAddFormSchema.shape[
                          field.name
                        ].isOptional()
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
                name="noEarlyCut"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {routingBgpTemplatesAddFormSchema.shape[
                          field.name
                        ].isOptional()
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
                name="redistribute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {routingBgpTemplatesAddFormSchema.shape[
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
          name="removePrivateAs"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {routingBgpTemplatesAddFormSchema.shape[
                    field.name
                  ].isOptional()
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
          name="routerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
          name="routingTable"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
          name="saveTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
          name="useBfd"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {routingBgpTemplatesAddFormSchema.shape[
                    field.name
                  ].isOptional()
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
          name="vrf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name.replace(/([A-Z])/g, " $1").trim()}
                {routingBgpTemplatesAddFormSchema.shape[field.name].isOptional()
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
