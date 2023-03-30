import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import validator from "validator";
import axios from "axios";

export default function AddUser({ onAddUser }) {
  const [visible, setVisible] = useState(false);
  const [selectValues, setSelectValues] = useState({
    gender: "Male",
    bloodGroup: "A+",
  });

  const handleSelectValueChange = (key, value) => {
    setSelectValues({
      ...selectValues,
      [key]: value,
    });
  };

  const handleAddUser = (values) => {
    let { firstName, lastName, email, phone, age } = values;
    values.gender = selectValues.gender;
    values.bloodGroup = selectValues.bloodGroup;
    values.image ="https://raw.githubusercontent.com/arhamkhnz/seekex-task-second/main/user.png";

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !age
    ) {
      message.error("Please fill in all fields");
      return;
    }

    if (!validator.isEmail(email)) {
      message.error("Please enter a valid email address");
      return;
    }

    if (!validator.isNumeric(phone)) {
      message.error("Please enter a valid phone number");
      return;
    }

    if (!validator.isNumeric(age)) {
      message.error("Please enter a valid age");
      return;
    }
    createUser(values);
  };

  const createUser = async (values) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/users/add",
        values
      );
      onAddUser(response);
      setVisible(false);
      message.success("User Added successfully");
    } catch (error) {
      message.error("An Error Occured Please Try Again");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add User
      </Button>
      <Modal
        destroyOnClose={true}
        open={visible}
        title="Add User"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddUser}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: false, message: "Please input your gender!" }]}
          >
            <Select
              defaultValue="Male"
              onChange={(val) => handleSelectValueChange("gender", val)}
              style={{ width: "100%" }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            type="number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[
              { required: false, message: "Please input your blood group!" },
            ]}
          >
            <Select
              defaultValue="A+"
              onChange={(val) => handleSelectValueChange("bloodGroup", val)}
              style={{ width: "100%" }}
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
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
