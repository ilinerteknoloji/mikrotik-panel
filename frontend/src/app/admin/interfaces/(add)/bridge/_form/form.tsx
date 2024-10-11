"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  arpValues,
  bridgeFormSchema,
  BridgeFormSchema,
  etherTypeValues,
  frameTypesValues,
  igmpVersionValues,
  mdlVersionValues,
  multicastRouterValues,
  protocolModeValues,
} from "./schema";
import { addBridge, updateBridge } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { FormAction } from "@/lib/types";

type Props = Readonly<
  | {
      type?: "create";
      id?: string;
      formData?: BridgeFormSchema;
    }
  | {
      type: "update";
      id: string;
      formData: BridgeFormSchema;
    }
>;

export function BridgeForm({ type = "create", id, formData }: Props) {
  const { toast } = useToast();

  const form = useForm<BridgeFormSchema>({
    resolver: zodResolver(bridgeFormSchema),
    defaultValues: {
      addDhcpOption82: formData?.addDhcpOption82 ?? false,
      adminMac: formData?.adminMac ?? "",
      ageingTime: formData?.ageingTime ?? "00:05:00",
      arp: formData?.arp ?? arpValues[0],
      arpTimeout: formData?.arpTimeout ?? 30,
      autoMac: formData?.autoMac ?? true,
      comment: formData?.comment ?? "",
      dhcpSnooping: formData?.dhcpSnooping ?? false,
      disabled: formData?.disabled ?? false,
      etherType: formData?.etherType ?? etherTypeValues[0],
      fastForward: formData?.fastForward ?? true,
      forwardDelay: formData?.forwardDelay ?? "00:00:15",
      frameTypes: formData?.frameTypes ?? frameTypesValues[0],
      igmpSnooping: formData?.igmpSnooping ?? false,
      igmpVersion: formData?.igmpVersion ?? igmpVersionValues[0],
      ingressFiltering: formData?.ingressFiltering ?? true,
      l2mtu: formData?.l2mtu ?? "",
      lastMemberInterval: formData?.lastMemberInterval ?? "1.00",
      lastMemberQueryCount: formData?.lastMemberQueryCount ?? 2,
      maxHops: formData?.maxHops ?? 20,
      maxMessageAge: formData?.maxMessageAge ?? "00:00:20",
      membershipInterval: formData?.membershipInterval ?? "260.00",
      mldVersion: formData?.mldVersion ?? mdlVersionValues[0],
      mtu: formData?.mtu ?? 1500,
      multicastQuerier: formData?.multicastQuerier ?? false,
      multicastRouter: formData?.multicastRouter ?? multicastRouterValues[0],
      name: formData?.name ?? "",
      priority: formData?.priority ?? 32768,
      protocolMode: formData?.protocolMode ?? protocolModeValues[0],
      pvid: formData?.pvid ?? 1,
      querierInterval: formData?.querierInterval ?? "255.00",
      queryInterval: formData?.queryInterval ?? "125.00",
      queryResponseInterval: formData?.queryResponseInterval ?? "10.00",
      regionName: formData?.regionName ?? "",
      regionRevision: formData?.regionRevision ?? 0,
      startupQueryCount: formData?.startupQueryCount ?? 2,
      startupQueryInterval: formData?.startupQueryInterval ?? "31.25",
      transmitHoldCount: formData?.transmitHoldCount ?? 6,
      vlanFiltering: formData?.vlanFiltering ?? false,
    },
  });

  const onSubmit = async (data: BridgeFormSchema) => {
    let response: FormAction<string>;
    switch (type) {
      case "create":
        response = await addBridge(data);
        break;
      case "update":
        response = await updateBridge(id!, data);
        break;
    }
    console.log("response.status: " + response.status);

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
                  {bridgeFormSchema.shape[field.name].isOptional() ? "?" : ""}
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
                {bridgeFormSchema.shape[field.name].isOptional() ? "?" : ""}
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

        <Accordion type="single" collapsible defaultValue="general">
          <AccordionItem value="general">
            <AccordionTrigger>General</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                name="mtu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
                name="autoMac"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
                name="arp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                            placeholder={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {arpValues.map((value) => (
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
                name="arpTimeout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
                name="adminMac"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                name="ageingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                name="igmpSnooping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
                name="dhcpSnooping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
                name="fastForward"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="stp">
            <AccordionTrigger>STP</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="protocolMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {protocolModeValues.map((value) => (
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
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="number"
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
                name="regionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                        disabled={form.watch("protocolMode") !== "mstp"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regionRevision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="number"
                        placeholder={field.name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                        className="capitalize"
                        disabled={form.watch("protocolMode") !== "mstp"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxMessageAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                name="forwardDelay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                name="transmitHoldCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value}
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
                name="maxHops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="number"
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

          <AccordionItem value="villan">
            <AccordionTrigger>Villan</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="vlanFiltering"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
              {form.watch("vlanFiltering") ? (
                <>
                  <FormField
                    control={form.control}
                    name="etherType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {field.name.replace(/([A-Z])/g, " $1").trim()}
                          {bridgeFormSchema.shape[field.name].isOptional()
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
                                placeholder={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {etherTypeValues.map((value) => (
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
                    name="pvid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {field.name.replace(/([A-Z])/g, " $1").trim()}
                          {bridgeFormSchema.shape[field.name].isOptional()
                            ? "?"
                            : ""}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            value={field.value}
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
                    name="frameTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {field.name.replace(/([A-Z])/g, " $1").trim()}
                          {bridgeFormSchema.shape[field.name].isOptional()
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
                                placeholder={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frameTypesValues.map((value) => (
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
                    name="ingressFiltering"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="capitalize">
                            {field.name.replace(/([A-Z])/g, " $1").trim()}
                            {bridgeFormSchema.shape[field.name].isOptional()
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
                </>
              ) : null}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="igmp">
            <AccordionTrigger>IGMP Snooping</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <FormField
                control={form.control}
                name="igmpVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                            placeholder={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {igmpVersionValues.map((value) => (
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

              {form.watch("igmpSnooping") ? (
                <FormField
                  control={form.control}
                  name="mldVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
                              placeholder={field.value}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mdlVersionValues.map((value) => (
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
              ) : null}

              <FormField
                control={form.control}
                name="multicastRouter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
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
                            placeholder={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {multicastRouterValues.map((value) => (
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
                name="multicastQuerier"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
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
                name="startupQueryCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
                name="lastMemberQueryCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
                name="lastMemberInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
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
                name="membershipInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
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
                name="queryInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
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
                name="queryResponseInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
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
                name="startupQueryInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                      {bridgeFormSchema.shape[field.name].isOptional()
                        ? "?"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
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

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {type === "create" ? "Oluştur" : "Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
