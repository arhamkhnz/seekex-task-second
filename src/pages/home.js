import React, { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import CardListComponent from "../components/CardListComponent";
import { Row } from "antd";

export default function Home() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setPersons(data.users);
    };
    fetchPersons();
  }, []);
  
  return (
    <>
      <TopNavigation />
      <Row style={{ marginTop: "1.5rem", padding: "0 50px" }} gutter={[16, 16]}>
        {persons.map((ele) => (
          <CardListComponent person={ele} />
        ))}
      </Row>
    </>
  );
}
