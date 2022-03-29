import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAllNotification,
  deleteNotification,
  addNotification,
} from "../../../redux/actions/notification";
import { Table, Modal, Button, Input } from "antd";
import Main from ".././layout/Main";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export const Notification = ({}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notifications.notificationData);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(getAllNotification());
  }, []);

  const [columns, setColumns] = useState([
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Delete",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <span
            onClick={(e) => {
              onDelete(record.id, e);
            }}
            style={{ marginRight: "20px" }}
          >
            <DeleteOutlined />
          </span>
          {/* <span
            onClick={(e) => {
              onDelete(record.id, e);
            }}
          >
            <EditOutlined />
          </span> */}
        </div>
      ),
    },
  ]);
  const onDelete = (id) => {
    // console.log({ id: id });
    dispatch(deleteNotification({ id }));
  };
  const [details, setDetails] = useState({
    title: "",
    description: "",
    img: "",
  });
  const handleDetails = (e) => {
    let object = {};
    object[e.target.name] = e.target.value;
    setDetails({ ...details, ...object });
  };
  const addNew = (e) => {
    e.preventDefault();
    dispatch(addNotification(details));
  };
  return (
    <Main>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add New Notification
      </Button>
      <Modal
        title="Add New User"
        visible={visible}
        onOk={(e) => addNew(e)}
        onCancel={() => setVisible(false)}
      >
        <Input
          type="text"
          name="title"
          placeholder="Title"
          style={{ marginBottom: "10px" }}
          onChange={(e) => handleDetails(e)}
        />
        {/* <Input
          type="text"
          placeholder="image address"
          name="img"
          style={{ marginBottom: "10px" }}
          onChange={(e) => handleDetails(e)}
        /> */}
        <Input.TextArea
          type="text"
          placeholder="Description"
          name="description"
          onChange={(e) => handleDetails(e)}
        />
      </Modal>
      <Table className="table-striped-rows admin-table" dataSource={data} columns={columns} style={{overflow:"scroll"}} />;
    </Main>
  );
};

export default Notification;
