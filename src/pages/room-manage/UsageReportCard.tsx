import { mockDevices } from "@/constants";
import { Device } from "@/types";
import { Card, Flex, Select, Switch, Typography, DatePicker } from "antd";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const { Title } = Typography;

const UsageReportCard = () => {
  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

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
          <Title level={2}>Usage Report</Title>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Select defaultValue={"weekly"} options={frequencyOptions} />
            <RangePicker
              format="DD/MM/YYYY"
              separator="-"
              style={{ borderRadius: "6px", height: 40 }}
            />
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default UsageReportCard;
