import React, { useState, useEffect } from "react";
import { Card, Modal, Row, Col, Image } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function CardListComponent({ person }) {
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCardClick = (person) => {
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
      <Modal open={visible} onCancel={handleModalClose} footer={null}>
        <div className="modal-content">
          <div className="modal-avatar-wrapper">
            <img
              src={person.image}
              alt={person.name}
              className="modal-avatar"
            />
            <div className="modal-name">
              {person.firstName} {person.lastName}
            </div>
          </div>
          <div className="modal-details">
            <div className="modal-email">{person.email}</div>
            <div className="modal-other-details">
              <div className="modal-other-detail">
                <div className="modal-other-detail-label">Gender:</div>
                <div className="modal-other-detail-value">{person.gender}</div>
              </div>
              <div className="modal-other-detail">
                <div className="modal-other-detail-label">Phone:</div>
                <div className="modal-other-detail-value">{person.phone}</div>
              </div>
              <div className="modal-other-detail">
                <div className="modal-other-detail-label">Age:</div>
                <div className="modal-other-detail-value">{person.age}</div>
              </div>
              <div className="modal-other-detail">
                <div className="modal-other-detail-label">Blood Group:</div>
                <div className="modal-other-detail-value">
                  {person.bloodGroup}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
