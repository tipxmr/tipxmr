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

export const UpdateStream = z.object({
  id: z.string(),
  url: z
    .string()
    .max(100, { message: "Maximum 100 characters allowed" })
    .optional(),
  platform: z
    .enum(["youtube", "twitch", "chaturbate", "selfhosted"])
    .optional(),
  language: z.enum(["english", "german", "french", "italian"]).optional(),
});
