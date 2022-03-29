import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAllRequest,
  addRequest,
  deleteRequest,
} from "../../../redux/actions/request";
import Main from ".././layout/Main";
import { Table, Modal, Button, Input, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export const Requests = ({ feeds }) => {
  const dispatch = useDispatch();
  const [data,setData] = useState([]);
  const origralData= useSelector((state) => state.requests.requestData)
  const bloodType = useSelector((state) => state.donors.bloodType);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
setData(origralData)
  }, [origralData]);
  useEffect(() => {
    dispatch(getAllRequest());
  }, [])
  
  const onSearch = (e) => {
 setData(...origralData.filter(entry => Object.keys(entry).some(val => typeof val === e && val.includes())));
  }
 const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Address",
      dataIndex: "address",
      key: "adress",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Hospital Name",
      dataIndex: "hospital_name",
      key: "hospital_name",
    },
    {
      title: "Hospital City",
      dataIndex: "hospital_city",
      key: "hospital_city",
    },
    {
      title: "Hospital State",
      dataIndex: "hospital_state",
      key: "hospital_state",
    },
    {
      title: "Requirement date",
      dataIndex: "date_required",
      key: "date_required",
      sortOrder: "descend",
    },
    {
      title: "Requested at",
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
    dispatch(deleteRequest({ id }));
  };
  const [details, setDetails] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "Male",
    address: "",
    city: "",
    state: "",
    phone: 0,
    hospital_name: "",
    hospital_address: "",
    hospital_city: "",
    hospital_state: "",
    hospital_phone: "",
    blood_type: "A+",
  });
  const handleDetails = (e) => {
    let object = {};
    object[e.target.name] = e.target.value;
    setDetails({ ...details, ...object });
  };
  const addNew = (e) => {
    e.preventDefault();
    dispatch(addRequest(details));
  };
  return (
    <Main>
      {/* <Row style={{marginLeft:'22px',padding:"12px"}}>
        <Col span={24} md={2} className="header-control">
          <Button type="primary" onClick={() => setVisible(true)}>
            Add New Request
          </Button>
          </Col>
          {/* <Col  className="header-control">
          <Input
            className="header-search"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            prefix={<SearchOutlined />}
          />
        </Col> 
      </Row> */}
      <Modal
        title="Add New Request"
        visible={visible}
        onOk={(e) => addNew(e)}
        onCancel={() => setVisible(false)}
      >
        <form
          onSubmit={(e) => addNew(e)}
          class="contact-form"
          id="contact-form-data"
        >
          <div class="row">
            <div class="col-sm-12" id="result"></div>
            <div class="col-lg-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>

            <div class="col-sm-3">
              <div class="form-group">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Age"
                  name="age"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div class="col-sm-3">
              <div class="form-group">
                <select
                  onChange={(e) => handleDetails(e)}
                  class="form-control"
                  placeholder="Gender"
                  name="gender"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <input
              class="form-control"
              name="address"
              placeholder="address"
              onChange={(e) => handleDetails(e)}
            ></input>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div class="col-sm-3">
              <div class="form-group">
                <input
                  onChange={(e) => handleDetails(e)}
                  name="state"
                  class="form-control"
                  type=""
                  placeholder="State"
                />
              </div>
            </div>
            <div class="col-sm-3">
              <div class="form-group">
                <select
                  class="form-control"
                  name="blood_type"
                  onChange={(e) => handleDetails(e)}
                >
                  {bloodType.map((st) => {
                    return <option>{st}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          <h6 class="sub-title main-color">Please fill Hospital Details.</h6>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="name"
                  name="hospital_name"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Phone Number"
                  name="hospital_phone"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="address"
              name="hospital_address"
              onChange={(e) => handleDetails(e)}
            ></input>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="City"
                  name="hospital_city"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  name="hospital_state"
                  class="form-control"
                  type=""
                  placeholder="State"
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
      
      <Table className="table-striped-rows admin-table" dataSource={data} columns={columns} style={{ overflow: "scroll" }} />;
    </Main>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     feeds: state.users,
//   };
// };

// const mapDispatchToProps = {};
export default Requests;
// export default connect(mapStateToProps)(Feed);
