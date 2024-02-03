import { z } from "zod";

export const UpdateDonationSetting = z.object({
  secondPrice: z.number().min(0, { message: "Minimum is 0" }).optional(),
  charPrice: z.number().min(0, { message: "Minimum is 0" }).optional(),
  charLimit: z.number().min(0, { message: "Minimum is 0" }).optional(),
  minAmount: z.number().min(0, { message: "Minimum is 0" }).optional(),
  gifsMinAmount: z.number().min(0, { message: "Minimum is 0" }).optional(),
  goal: z.number().min(0, { message: "Minimum is 0" }).optional(),
  size: z.number().min(0, { message: "Minimum is 0" }).optional(),
  color: z.string().optional(),
});
