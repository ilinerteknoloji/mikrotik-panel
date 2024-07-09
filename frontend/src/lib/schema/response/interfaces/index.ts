import { z } from "zod";
import { createResponseSchema } from "..";

export const interfaceItem = z.object({
  id: z.string(),
  defaultName: z.string().optional(),
  name: z.string(),
  type: z.string(),
});

export type InterfaceItem = z.infer<typeof interfaceItem>;

export const interfacesResponseSchema = createResponseSchema(
  z.array(interfaceItem),
);
