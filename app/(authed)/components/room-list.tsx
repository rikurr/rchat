"use client";

import Link from "next/link";
import { Button } from "@/common/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetRooms } from "@/features/chat/hooks/useGetRooms";

export const RoomList = () => {
  const { data, isLoading } = useGetRooms();
  const { push } = useRouter();

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="flex flex-col sm:max-w-lg mx-auto">
      <div className="flex p-4 justify-between items-center">
        <Button className="w-full" onClick={() => push("/room/create")}>
          <span>ルーム作成</span>
        </Button>
      </div>
      <ul>
        {data.map((room) => (
          <li key={room.id} className="hover:bg-slate-100">
            <Link href={`/room/${room.id}`} className="p-4 block">
              <h3 className="text-md font-semibold">{room.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
