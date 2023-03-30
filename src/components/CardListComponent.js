import React, { useState } from "react";
import {
  Card,
  Modal,
  Row,
  Col,
  Image,
  Input,
  Button,
  Select,
  message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;

export default function CardListComponent({ person, onUpdateUser }) {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    phone: person.phone,
    age: person.age,
    bloodGroup: person.bloodGroup,
  });

  const handleCardClick = () => {
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setEdit(false);
    setEditValues({
      firstName: person.firstName,
      lastName: person.lastName,
      gender: person.gender,
      phone: person.phone,
      age: person.age,
      bloodGroup: person.bloodGroup,
    });
  };

  const handleEditValueChange = (key, value) => {
    setEditValues({
      ...editValues,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    let { gender, phone, age, bloodGroup, firstName, lastName } = editValues;

    if (gender == "" || phone == "" || age == "" || bloodGroup == "" || firstName == "" || lastName == "") {
      message.error("Please fill in all fields");
    } else {
      updateUser();
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/users/${person.id}`,
        editValues
      );
      onUpdateUser(response);
      setVisible(false);
      message.success("User Updated successfully");
    } catch (error) {
      message.error("An Error Occured Please Try Again");
    }
  };

  return (
    <>
      <Col key={person.id} xs={24} sm={12} md={8} lg={8}>
        <Card hoverable className="card-view">
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
                title={`${person.firstName} ${person.lastName}`}
                description={
                  <>
                    <p style={{ margin: 0 }}>{person.email}</p>
                    <p style={{ margin: 0 }}>{person.phone}</p>
                  </>
                }
              />
              <button className="view-button" onClick={() => handleCardClick()}>
                <EyeOutlined />
              </button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Modal
        destroyOnClose={true}
        open={visible}
        onCancel={handleModalClose}
        footer={
          edit ? (
            <div className="modal-footer-edit">
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button onClick={() => handleUpdate()} type="primary">
                Update
              </Button>
            </div>
          ) : (
            <div className="modal-footer">
              <Button onClick={() => setEdit(true)}>Edit</Button>
            </div>
          )
        }
      >
        <div className="modal-content">
          <div className="modal-avatar-wrapper">
            <img
              src={person.image}
              alt={person.name}
              className="modal-avatar"
            />
            {!edit && 
            <div className="modal-name">
            {person.firstName} {person.lastName}
          </div>
            }
          </div>
          <div className="modal-details">
            <div className="modal-email">{person.email}</div>
            {edit ? (
              <>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">First Name:</div>
                  <Input
                    className="modal-other-detail-input"
                    value={editValues.firstName}
                    onChange={(e) =>
                      handleEditValueChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">Last Name:</div>
                  <Input
                    className="modal-other-detail-input"
                    value={editValues.lastName}
                    onChange={(e) =>
                      handleEditValueChange("lastName", e.target.value)
                    }
                  />
                </div>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">Gender:</div>
                  <Select
                    className="modal-other-detail-input"
                    defaultValue={editValues.gender}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleEditValueChange("gender", e.target.value)
                    }
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                </div>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">Phone:</div>
                  <Input
                    className="modal-other-detail-input"
                    value={editValues.phone}
                    onChange={(e) =>
                      handleEditValueChange("phone", e.target.value)
                    }
                  />
                </div>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">Age:</div>
                  <Input
                    className="modal-other-detail-input"
                    value={editValues.age}
                    onChange={(e) =>
                      handleEditValueChange("age", e.target.value)
                    }
                  />
                </div>
                <div className="modal-other-detail-edit">
                  <div className="modal-other-detail-label">Blood Group:</div>
                  <Select
                    className="modal-other-detail-input"
                    defaultValue={editValues.bloodGroup}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleEditValueChange("bloodGroup", e.target.value)
                    }
                    options={[
                      { value: "A+", label: "A+" },
                      { value: "A-", label: "A-" },
                      { value: "B+", label: "B+" },
                      { value: "B-", label: "B-" },
                      { value: "O+", label: "O+" },
                      { value: "O-", label: "O-" },
                      { value: "AB+", label: "AB+" },
                      { value: "AB-", label: "AB-" },
                    ]}
                  />
                </div>
              </>
            ) : (
              <div className="modal-other-details">
                <div className="modal-other-detail">
                  <div className="modal-other-detail-label">Gender:</div>
                  <div className="modal-other-detail-value">
                    {person.gender}
                  </div>
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
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
