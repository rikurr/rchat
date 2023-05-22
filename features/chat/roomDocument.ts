import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const roomDocument = z.object({
  id: z.string(),
  name: z.string(),
  createdBy: z.string(),
  createdAt: z.instanceof(Timestamp),
});

export const roomDocumentList = z.array(roomDocument);

export type RoomDocument = z.infer<typeof roomDocument>;

export const messageDocument = z.object({
  id: z.string(),
  text: z.string(),
  sentBy: z.string(),
  createdAt: z.instanceof(Timestamp),
});

export const messageDocumentList = z.array(messageDocument);

export type MessageDocument = z.infer<typeof messageDocument>;
