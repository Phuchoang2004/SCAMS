import { mockDevices } from "@/constants";
import { Device } from "@/types";
import { Card, Flex, Switch, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const DevicesControlCard = () => {
  const [devices, setDevices] = useState<Array<Device>>([]);

  useEffect(() => {
    setTimeout(() => {
      setDevices(mockDevices);
    }, 1000);
  }, []);

  return (
    <Card>
      <Flex vertical align="flex-start" gap={40}>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Title level={2}>Devices Control</Title>
          <Switch defaultValue={true} />
        </div>
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            width: "100%",
            gap: 24,
          }}
        >
          {devices.map((device) => (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{device.name}</div>
              <Switch defaultValue={device.enabled} />
            </div>
          ))}
        </div>
      </Flex>
    </Card>
  );
};

export default DevicesControlCard;
