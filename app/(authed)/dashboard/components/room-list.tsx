"use client";

import { RoomDocument } from "@/features/chat/roomDocument";
import Link from "next/link";
import React, { FC } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  rooms: RoomDocument[];
};

export const RoomList: FC<Props> = ({ rooms }) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col sm:max-w-lg mx-auto">
      <div className="flex p-4 justify-between items-center">
        <h2 className="text-lg font-bold">一覧</h2>
        <Button
          onClick={() => push("/room/create")}
          variant="outline"
          className="w-10 rounded-full p-0"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">作成</span>
        </Button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="border last:border-t-0">
            <Link href={`/room/${room.id}`} className="p-4 block">
              <h3 className="text-md font-semibold">{room.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
