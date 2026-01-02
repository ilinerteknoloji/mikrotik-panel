import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const dontFragmentValues = ["no", "inherit"] as const;

export const greTunnelFormSchema = z.object({
  clampTcpMss: z.coerce.boolean().optional(),
  comment: z.string().optional(),
  disabled: z.coerce.boolean().optional(),
  dontFragment: z.enum(dontFragmentValues).optional(),
  dscp: z
    .string()
    .refine(
      (value) => {
        if (value === "inherit") return true;
        const dscpValue = parseInt(value);
        return dscpValue >= 0 && dscpValue <= 63;
      },
      {
        message: "Must be a number between 0 and 63 or 'inherit'",
      },
    )
    .optional(),
  ipsecSecret: z.string().optional(),
  keepalive: z
    .string()
    .refine(
      (value) => {
        const [interval, count] = value.split(",");
        const isPast = regexConstants.time[0].test(interval);
        return (
          isPast &&
          !isNaN(parseInt(count)) &&
          parseInt(count) >= 0 &&
          parseInt(count) <= 4294967295
        );
      },
      {
        message:
          "Format must be HH:MM:SS, count. Count must be between 0 and 4294967295",
      },
    )
    .optional(),
  localAddress: z.string().optional(),
  mtu: z.coerce.number().int().min(0).max(65536).optional(),
  name: z.string().optional(),
  remoteAddress: z.string().ip(),
});

export type GreTunnelSchema = z.infer<typeof greTunnelFormSchema>;
