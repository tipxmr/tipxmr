import { z } from "zod";

export const UpdateDonationSetting = z.object({
  secondPrice: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  charPrice: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  charLimit: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  minAmount: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  gifsMinAmount: z.coerce
    .number()
    .min(0, { message: "Minimum is 0" })
    .optional(),
  goal: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  size: z.coerce.number().min(0, { message: "Minimum is 0" }).optional(),
  color: z.string().optional(),
});
