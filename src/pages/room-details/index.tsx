import RoomDetailsLayout from "@/components/details-layout";
import { Room, RoomSession } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsCard from "./DetailsCard";
import ScheduleCard from "./ScheduleCard";
import Loading from "@/components/loading";
import { roomsService } from "@/services/rooms";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState<Room | null>(null);
  const [sessions, setSessions] = useState<RoomSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRoomDetails = async () => {
      setLoading(true);
      try {
        const data = await roomsService.getDetails(id);
        setRoom(data.room);
        setSessions(data.sessions);
      } catch (err) {
        console.error("Failed to fetch room details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

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
      <ScheduleCard sessions={sessions} />
    </RoomDetailsLayout>
  );
};

export default RoomDetails;
