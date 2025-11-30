import { Spin } from "antd";

type LoadingProps = {
  customText?: string;
};

const Loading = ({ customText }: LoadingProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin spinning={true} tip={customText || "Loading data..."} />
    </div>
  );
};

export default Loading;
