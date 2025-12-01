import Loading from "@/components/loading";
import { mockReportData } from "@/constants";
import { UsageReportData } from "@/types";
import { Card, Flex, Select, Typography, DatePicker, theme } from "antd";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { RangePicker } = DatePicker;

const { Title } = Typography;

const UsageReportCard = () => {
  const { token } = theme.useToken();
  const [data, setData] = useState<Array<UsageReportData>>([]);
  const [view, setView] = useState<"watts" | "hours">("hours");
  const [loading, setLoading] = useState(false);

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const viewOptions = [
    {
      value: "hours",
      label: "Usage in hours",
    },
    {
      value: "watts",
      label: "Usage in Watts",
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockReportData);
      setLoading(false);
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
            <Select
              defaultValue={"hours"}
              onChange={(value) => setView(value as "hours" | "watts")}
              options={viewOptions}
            />
            <RangePicker
              format="DD/MM/YYYY"
              separator="-"
              style={{ borderRadius: "6px", height: 40 }}
            />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <BarChart
            style={{
              width: "99%",
              height: 240,
            }}
            responsive
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={view}
              fill={token.colorPrimary}
              activeBar={<Rectangle fill="pink" stroke={"blue"} />}
            />
          </BarChart>
        )}
      </Flex>
    </Card>
  );
};

export default UsageReportCard;
