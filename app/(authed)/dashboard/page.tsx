"use client";

import { useGetRooms } from "@/features/chat/hooks/useGetRooms";
import { RoomList } from "./components/room-list";

export default function Dashboard() {
  const { data, isLoading } = useGetRooms();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="">
      <RoomList rooms={data} />
    </div>
  );
}
