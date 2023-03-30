import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function TopNavigation() {
  return (
    <div style={{ backgroundColor: "#EAFBFF", padding: "10px" }}>
      <Title level={3} style={{ fontWeight: "bold", margin: 0 }}>
        My App
      </Title>
    </div>
  );
}
