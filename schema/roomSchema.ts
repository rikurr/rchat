import { z } from "zod";
import { userDocument } from "./userSchama";

// ルームドキュメント
export const roomDocument = z.object({
  id: z.string(),
  name: z.string(),
  createdBy: z.string(),
  // createdAt: z.instanceof(Timestamp),
});
export const roomDocumentList = z.array(roomDocument);
export type RoomDocument = z.infer<typeof roomDocument>;

// メッセージドキュメント
export const messageDocument = z.object({
  id: z.string(),
  type: z.string(),
  text: z.string(),
  sentBy: z.string(),
  createdAt: z.number(),
});
export const messageDocumentList = z.array(messageDocument);
export type MessageDocument = z.infer<typeof messageDocument>;

// メッセージドキュメントにユーザードキュメントをマージ
export const messageInUserDocument = messageDocument.merge(
  z.object({
    user: userDocument,
  }),
);
export type MessageInUserDocument = z.infer<typeof messageInUserDocument>;
