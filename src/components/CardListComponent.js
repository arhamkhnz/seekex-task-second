import React, { useState, useEffect } from "react";
import { Card, Modal, Row, Col, Image } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function CardListComponent({ person }) {
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCardClick = (person) => {
    setSelectedPerson(person);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Col key={person.id} xs={24} sm={12} md={8} lg={6}>
        <Card
          hoverable
          className="card-view"
          onClick={() => handleCardClick(person)}
        >
          <Row>
            <Col xs={8} sm={6} md={6}>
              <div className="avatar-wrapper">
                <Image
                  src={person.image}
                  alt={person.firstName}
                  className="avatar"
                />
              </div>
            </Col>
            <Col xs={16} sm={18} md={18}>
              <Meta
                style={{ padding: "0.5rem" }}
                title={person.firstName}
                description={person.email}
              />
              <button
                className="view-button"
                onClick={() => handleCardClick(person)}
              >
                <EyeOutlined />
              </button>
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Modal
        visible={visible}
        title={person.name}
        onCancel={handleModalClose}
        footer={null}
      >
        <img src={person.avatar} alt={person.name} className="modal-avatar" />
        <p>Email: {person.email}</p>
        <p>Date of Birth: {person.dob}</p>
        <p>Country: {person.country}</p>
      </Modal> */}
    </>
  );
}
