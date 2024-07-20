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

type Props = Readonly<{}>;

export function BridgeForm({}: Props) {
  const form = useForm<BridgeFormSchema>({
    resolver: zodResolver(bridgeFormSchema),
    defaultValues: {
      addDhcpOption82: false,
      adminMac: "",
      ageingTime: "00:05:00",
      arp: arpValues[0],
      arpTimeout: 30,
      autoMac: true,
      comment: "",
      dhcpSnooping: false,
      disabled: false,
      etherType: etherTypeValues[0],
      fastForward: true,
      forwardDelay: "",
      frameTypes: frameTypesValues[0],
      igmpSnooping: false,
      igmpVersion: igmpVersionValues[0],
      ingressFiltering: false,
      l2mtu: "",
      lastMemberInterval: "",
      lastMemberQueryCount: 0,
      maxHops: 0,
      maxMessageAge: "",
      membershipInterval: "",
      mldVersion: mdlVersionValues[0],
      mtu: 1500,
      multicastQuerier: false,
      multicastRouter: multicastRouterValues[0],
      name: "",
      priority: 0,
      protocolMode: protocolModeValues[0],
      pvid: 1,
      querierInterval: "",
      queryInterval: "",
      queryResponseInterval: "",
      regionName: "",
      regionRevision: 0,
      startupQueryCount: 0,
      startupQueryInterval: "",
      transmitHoldCount: 0,
      vlanFiltering: false,
    },
  });

  const onSubmit = async (data: BridgeFormSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="disabled"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                  {bridgeFormSchema.shape[field.name].isOptional() ? "?" : ""}
                </FormLabel>
                <FormControl>
                  <Switch
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription />
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

              {/* <FormField
                control={form.control}
                name="l2mtu"
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
                        placeholder={field.name.replace(/([A-Z])/g, " $1").trim()}
                        className="capitalize"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="autoMac"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
                          ? "?"
                          : ""}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription />
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
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
                          ? "?"
                          : ""}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dhcpSnooping"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
                          ? "?"
                          : ""}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fastForward"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="capitalize">
                        {field.name.replace(/([A-Z])/g, " $1").trim()}
                        {bridgeFormSchema.shape[field.name].isOptional()
                          ? "?"
                          : ""}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="stp">
            <AccordionTrigger>STP</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <p>STP Content</p>
              <p>STP Content</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="villan">
            <AccordionTrigger>Villan</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <p>Villan Content</p>
              <p>Villan Content</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="igmp">
            <AccordionTrigger>IGMP Snooping</AccordionTrigger>
            <AccordionContent className="space-y-8 p-2">
              <p>IGMP Snooping Content</p>
              <p>IGMP Snooping Content</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
