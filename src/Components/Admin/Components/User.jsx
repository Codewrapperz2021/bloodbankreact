import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateDonorsData, deleteUser } from "../../../redux/actions/donors";
import { registerDonor } from "../../../Service/DonorService";
import { Table, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Main from "../../Admin/layout/Main";
import axios from 'axios';
import { api_base_url } from "../../../Constants";
export const User = ({
  updateDonorsData,
  canFetchDonors,
  donorsData,
  deleteUser,
}) => {
  const [volunteer, setVolunteer] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log(donorsData.length);
    canFetchDonors ? setData(donorsData) : updateDonorsData();
  }, [donorsData]);

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Blood Type",
      dataIndex: "blood_type",
      key: "blood_type",
    },

    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Registration date",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: 'descend',
      sorter: {compare: (a, b) => a.created_at > b.created_at},
      render: (text, record) => (
       <div>
        {text.substring(0, 10)}
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          {" "}
          <span
            onClick={(e) => {
              onDelete(record.id, e);
            }}
          >
            <DeleteOutlined />
          </span>
          <span
            onClick={(e) => {
              setEditId(record);
            }}
          >
            <EditOutlined />
          </span>
        </>
      ),
    },
  ]);
  const onDelete = (id) => {
    // console.log({ id: id });
    deleteUser({ id: id });
  };

  const onEdit = (id) => {};
  const [editId, setEditId] = useState({ id: 0 });
  let object={id:editId.id}
  const [details, setDetails] = useState({});
  const handleRole = (e) => {
    object.role=e.target.value
  };
  const handleOption = (e, value) => {
  
    object[e.target.name] = value;

  };

  

  const addNew = (e) => {
    e.preventDefault();
    console.log("saransh", details);
    registerDonor(details);
  };
  const update = async(e) => {
    e.preventDefault();
    setEditId({ id: 0 })
    await axios.post(api_base_url +"/update",object)
    console.log('update',object)   
    updateDonorsData()
  };
  
  return (
    <Main>
      <Modal
        title="Edit User"
        visible={editId.id != 0}
        onOk={(e) => update(e)}
        onCancel={() => setEditId({ id: 0 })}
      >
        <form
          class="contact-form"
          id="contact-form-data"
          onSubmit={(e) => {
            update(e);
          }}
        >
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <select
                  class="form-control"
                  name="blood_type"
                  defaultValue={editId.role}
                  onChange={(e) => {
                    handleRole(e);
                  }}
                >
                  <option value="user">User</option>;
                  <option value="admin">Admin</option>;
                </select>
              </div>
            </div>
          </div>
          <br></br>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <p>Assign Donar.</p>
                <div class="row">
                  <div class="col-lg-6">
                    <input
                      type="radio"
                      id="yes"
                      onChange={(e) => {}}
                      name="is_donor_active"
                      value="yes"
                      defaultChecked={editId.is_donor_active == "1"}
                      onSelect={(e)=>handleOption(e,"1")}
                    />
                    <label class="ml-2" for="car">
                      Yes
                    </label>
                  </div>
                  <br></br>
                  <div class="col-lg-6">
                    <input
                      type="radio"
                      id="yes"
                      onChange={(e) => {}}
                      name="is_donor_active"
                      value="no"
                      defaultChecked={editId.is_donor_active != "1"}
                      onSelect={(e)=>handleOption(e,"0")}
                    />
                    <label class="ml-2" for="bike">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <p>Assign Volunteer.</p>
                <div class="row">
                  <div class="col-lg-6">
                    <input
                      type="radio"
                      id="yes"
                      onChange={(e) => {}}
                      name="is_volunteer_active"
                      value="yes"
                      defaultChecked={editId.is_volunteer_active == "1"}
                      onSelect={(e)=>handleOption(e,"1")}
                    />
                    <label class="ml-2" for="Volunteer">
                      Yes
                    </label>
                  </div>
                  <br></br>
                  <div class="col-lg-6">
                    <input
                      type="radio"
                      id="yes"
                      onChange={(e) => {}}
                      name="is_volunteer_active"
                      value="no"
                      defaultChecked={editId.is_volunteer_active != "1"}
                      onSelect={(e)=>handleOption(e,"0")}
                    />
                    <label class="ml-2" for="Volunteer">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
          
      <Table className="table-striped-rows admin-table" dataSource={data} columns={columns} style={{overflow:"scroll"}} />;
    </Main>
  );
};

const mapStateToProps = (state) => ({
  donorsData: state.donors.donorsData,
  canFetchDonors: state.donors.canFetchDonors,
});

const mapDispatchToProps = { updateDonorsData, deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(User);
