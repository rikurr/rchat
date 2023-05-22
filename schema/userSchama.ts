import { z } from "zod";

// ユーザードキュメント
export const userDocument = z.object({
  displayName: z.string(),
  email: z.string(),
  photoURL: z.string().nullable(),
});

export type UserDocument = z.infer<typeof userDocument>;
