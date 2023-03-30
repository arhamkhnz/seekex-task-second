import React, { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import CardListComponent from "../components/CardListComponent";
import AddUser from "../components/AddUser";
import { Row } from "antd";

export default function Home() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch("https://dummyjson.com/users?skip=90");
      const data = await response.json();
      setPersons(data.users);
    };
    fetchPersons();
  }, []);

  const handleAddUser = (value) => {
    const data = value.data;
    console.log(data);
    setPersons((prevPersons) => [...prevPersons, data]);
  };

  const handleUpdateUser = (value) => {
    const data = value.data;
    const { id, ...updatedUser } = data;
    setPersons((prevPersons) =>
      prevPersons.map((person) => {
        if (person.id === id) {
          return { ...person, ...updatedUser };
        } else {
          return person;
        }
      })
    );
  };

  return (
    <>
      <TopNavigation />
      <div style={{ marginTop: "0.5rem", padding: "0 50px" }}>
        <AddUser onAddUser={handleAddUser} />
        <Row style={{ marginTop: "0.5rem" }} gutter={[16, 16]}>
          {persons.map((ele) => (
            <CardListComponent onUpdateUser={handleUpdateUser} person={ele} />
          ))}
        </Row>
      </div>
    </>
  );
}
