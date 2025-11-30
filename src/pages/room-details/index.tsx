import RoomDetailsLayout from "@/components/details-layout";
import { mockRoom } from "@/constants";
import { Room } from "@/types";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsCard from "./DetailsCard";
import ScheduleCard from "./ScheduleCard";
import Loading from "@/components/loading";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRoom(mockRoom);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <RoomDetailsLayout currentTab="details">
        <Loading customText="Loading room data..." />
      </RoomDetailsLayout>
    );
  if (!room) return <></>;

  return (
    <RoomDetailsLayout currentTab="details">
      <DetailsCard room={room} />
      <ScheduleCard />
    </RoomDetailsLayout>
  );
};

export default RoomDetails;
