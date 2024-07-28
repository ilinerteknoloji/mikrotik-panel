"use client";

import { RDnsRecord } from "@/lib/schema/response/rdns-hosts/rdns-records";
import { useForm } from "react-hook-form";
import { rDnsRecordSchema, RDnsRecordSchema } from "./schema";
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
import { Button } from "@/components/ui/button";
import { updateRDnsRecord } from "./actions";
import { useToast } from "@/components/ui/use-toast";

type Props = Readonly<{
  record: RDnsRecord;
}>;

export function UpdateRdnsForm({ record }: Props) {
  const { toast } = useToast();
  const form = useForm<RDnsRecordSchema>({
    resolver: zodResolver(rDnsRecordSchema),
    defaultValues: {
      record: record.record,
    },
  });

  const onSubmit = async (data: RDnsRecordSchema) => {
    const response = await updateRDnsRecord(record, data);
    if (!response.status)
      return toast({ title: "Error", description: response.message });
    toast({ title: "Success", description: response.data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="record"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Record</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Record" />
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
          Update
        </Button>
      </form>
    </Form>
  );
}
