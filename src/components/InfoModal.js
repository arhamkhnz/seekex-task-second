import { useState } from "react";
import { Modal } from "antd";

export default function InfoModal() {
  const [visible, setVisible] = useState(
    sessionStorage.getItem("infoModalShown") !== "true"
  );

  const handleOk = () => {
    setVisible(false);
    sessionStorage.setItem("infoModalShown", "true");
  };

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleOk}>
      <h1>Welcome to our User Management System!</h1>
      <p>
        This system uses the <strong>DummyJSON User API</strong> to fetch user
        data. You can add new users and update existing users through the
        system. However, please note that any changes made using the DummyJSON
        API are temporary and will be removed when the page is reloaded.<strong> Newly
        added users cannot be edited as they do not exist in the API's database.
        </strong></p>
      <p>
        When adding a new user, you will be prompted to provide their{" "}
        <strong>first name</strong>, <strong>last name</strong>,{" "}
        <strong>email</strong>, <strong>gender</strong>,{" "}
        <strong>phone number</strong>, <strong>age</strong>, and{" "}
        <strong>blood group</strong>. For adding the image of the user please
        note that the image URL is hardcoded for creating a new image and the
        image is located in the project repository.
      </p>
      <p>
        To update an existing user's information, simply click on{" "}
        <strong>Eye Icon</strong> on their profile card and edit the relevant
        details. Once you are finished editing, click on the{" "}
        <strong>"Update"</strong> button to save the changes.
      </p>
      <p>We hope you find our User Management System helpful!</p>
    </Modal>
  );
}
