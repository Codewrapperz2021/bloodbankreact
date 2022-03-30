import React, { useState, useEffect } from "react";
import { logout, updateUser } from "../../Service/AuthService";
import { connect, useDispatch, useSelector } from "react-redux";
import { Input, Modal, Button, Table, Spin, Tag, message } from "antd";
import { getAllRequestByUser } from "../../redux/actions/request";
import axios from "axios";
import Footer from "../Admin/layout/Footer";
import { api_base_url } from "../../Constants";
import jsPDF from "jspdf";
// import "../style.css";
export default function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const [forgetvis, setForgetvis] = useState(false);
  const [requester, setRequester] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [number, setNumber] = useState("");
  const [sendotp, setSendotp] = useState("");
  const [otp, setOtp] = useState("");
  const [Pass, setPass] = useState("");

  const columns = [
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
  ];
  const [columnss, setColumnss] = useState([
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
      title: "Status",
      dataIndex: "id",
      key: "id",

      render: (text, record) =>
        record.status == "0" ? (
          <Button
            type="danger"
            onClick={() => {
              const data = {
                id: record.id,
                status: "1",
              };
              axios
                .post(api_base_url + "/updateraisedrequest", data)
                .then((res) => {
                  GetRequesterData();
                  message.success("request accpeted");
                });
            }}
            style={{ marginLeft: "10px" }}
          >
            Accept
          </Button>
        ) : record.status == "1" ? (
          // <Button
          //   type="danger"
          //   onClick={() => setVis(true)}
          //   style={{ marginLeft: "10px" }}
          // >
          //   Feedback
          // </Button>
          "Accepted"
        ) : (
          "Donated"
        ),
    },
    {
      title: "Feedback",
      dataIndex: "id",
      key: "id",
      render: (text, record) =>
        record.status == "2" ? (
          <Button type="danger" onClick={() => setVis(true)}>
            Feedback
          </Button>
        ) : (
          <Button type="danger">Feedback</Button>
        ),
    },
  ]);

  const [data, setData] = useState([]);
  const [details, setDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") == null) window.location = "/login";
    else {
      axios
        .post(`${api_base_url}/getAllRequest`, {
          id: details.id,
        })
        .then((res) => {
          console.log("saransh", res.data);
          setData(res.data.requestData);
        });
      // data && data.status == "success" && setData(data.requestData);
    }
  }, []);
  useEffect(() => {
    GetRequesterData();
  }, []);
  const GetRequesterData = () => {
    if (localStorage.getItem("token") == null) window.location.hash = "home";
    else {
      axios
        .get(`${api_base_url}/raisedlist`, {
          id: details.id,
        })
        .then((res) => {
          const response = res.data;
          console.log("rse", response);
          const temp1 = response.filter((el) => {
            return (
              el.email !=
                JSON.parse(localStorage.getItem("userDetails")).email &&
              el.donor_id == JSON.parse(localStorage.getItem("userDetails")).id
            );
          });
          setRequester(temp1);
        });
    }
  };

  const handleDetails = (e) => {
    let object = {};
    object[e.target.name] = e.target.value;
    setDetails({ ...details, ...object });
  };
  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("saransh", details);
    await updateUser(details);
    setLoading(false);
    setVisible(false);
  };

  const userlogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };
  const addFeedback = () => {
    let id = JSON.parse(localStorage.getItem("userDetails")).id;
    const data = { description: feedback, user_id: id };
    axios
      .post(api_base_url + "/addfeedback", data)
      .then((res) => {
        var doc = new jsPDF();
        doc.text(
          20,
          20,
          "Hello " + JSON.parse(localStorage.getItem("userDetails")).name
        );
        doc.text(
          20,
          30,
          "This is regarding the donation you have made recently."
        );
        doc.text(20, 40, "We thank you for your efforts,");
        doc.text(20, 50, "Thank you");
        doc.save("Certificate.pdf");
        message.success("Feedback posted");
        setVis(false);
      })
      .catch((err) => {
        message.error("Something Went Wrong");
      });
  };
  if (localStorage.getItem("token") == null) return <></>;

  function sentotp() {
    const num = {
      phone: number,
    };
    axios.post(api_base_url + "/resetpasswordotp", num).then((res) => {
      setSendotp(res.data.otp)    
      message.success("otp sent to your phone");
    });
  }
  function forgetpass(){
    const data={
      phone:number,
      password:Pass
    }
    {otp == sendotp ?
    axios.post(api_base_url + "/resetpassowrd", data).then((res) => {  
      message.success("Password changed");
    })
    :message.error('please enter correct otp');
  } 
  }
  return (
    <>
      <section
        id="profile"
        // class="pt-page pt-page-6 pt-5"
        data-id="profile"
        className="my_section"
        style={{}}
      >
        <Modal
          title="Feedback form"
          visible={vis}
          onOk={addFeedback}
          onCancel={() => setVis(false)}
        >
          <form
            class="contact-form"
            id="contact-form-data"
            onSubmit={addFeedback}
          >
            <div class="col-12" id="feedbakc"></div>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="feedback"
                name="feedback"
                // value={details?.email}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal>
        <Modal
          title="Feedback form"
          visible={vis}
          onOk={addFeedback}
          onCancel={() => setVis(false)}
        >
          <form
            class="contact-form"
            id="contact-form-data"
            onSubmit={addFeedback}
          >
            <div class="col-12" id="feedbakc"></div>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="feedback"
                name="feedback"
                // value={details?.email}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal>
        <Spin spinning={loading} size="large">
          <div style={{}} class="container">
            <div class="container mt-5">
              <div class="row d-flex justify-content-center">
                <div class="col-md-7">
                  <div
                    class="card p-3 py-4"
                    style={{
                      background: "#f1f2f8",
                      boxShadow: "10px 10px 10px lightgray",
                      border: "1px solid rosybrown",
                    }}
                  >
                    <div class="text-center">
                      {" "}
                      <img
                        src="https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg"
                        width="100"
                        class="rounded-circle"
                      />{" "}
                    </div>
                    <div class="text-center mt-3">
                      {" "}
                      <span class="bg-secondary p-1 px-4 rounded text-white">
                        {details.is_donor_active == 1 ? "Donor" : "User"}
                      </span>
                      <h5 class="mt-2 mb-0">Hi, {details.name}</h5>{" "}
                      <div class="buttons" style={{ marginTop: "15px" }}>
                        <button
                          class="btn btn-outline-primary px-4"
                          onClick={() => setVisible(true)}
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() => userlogout()}
                          class="btn btn-primary px-4 ms-3"
                          style={{ marginLeft: "15px" }}
                        >
                          Logout
                        </button>{" "}
                      </div>
                      <a onClick={() => setForgetvis(true)}>forget password</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class=" align-items-lg-center dot-box">
                {/* <div class="col-6"> */}
                <div class="heading-area">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5 className="mt-4" style={{ paddingBottom: "12px" }}>
                      <Tag
                        color="magenta"
                        style={{ border: "none", fontSize: "38px" }}
                      >
                        Your Request As Needy
                      </Tag>
                    </h5>

                    <div></div>
                  </div>
                  <p>
                    <Tag color="red" style={{ fontSize: "15px" }}>
                      {" "}
                      Omniscient BloodBank
                    </Tag>
                  </p>
                  <br />
                </div>
                <Modal
                  title="Edit Profile"
                  visible={visible}
                  onOk={(e) => update(e)}
                  onCancel={() => setVisible(false)}
                >
                  <Spin spinning={loading} size="large">
                    <form
                      class="contact-form"
                      id="contact-form-data"
                      onSubmit={(e) => {
                        update(e);
                      }}
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
                              value={details?.name}
                              onChange={(e) => {
                                handleDetails(e);
                              }}
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
                              value={details?.email}
                              onChange={(e) => {
                                handleDetails(e);
                              }}
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
                              value={details?.phone}
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            />
                          </div>
                        </div>

                        <div class="col-sm-3">
                          <div class="form-group">
                            <input
                              class="form-control"
                              type="number"
                              placeholder="Age"
                              value={details?.age}
                              name="age"
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <select
                              class="form-control"
                              placeholder="Gender"
                              defaultValue={details?.gender}
                              name="gender"
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <div class="col-lg-9">
                            <input
                              class="form-control"
                              name="address"
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                              value={details?.address}
                              placeholder="address"
                            ></input>
                          </div>
                          <div class="col-sm-3">
                            <input
                              class="form-control"
                              name="blood_type"
                              value={details?.blood_type}
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="City"
                              name="city"
                              value={details?.city}
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <input
                              class="form-control"
                              type=""
                              placeholder="State"
                              value={details?.state}
                              name="state"
                              onChange={(e) => {
                                handleDetails(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div class="form-group">
                <input
                  class="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => {
                    handleDetails(e);
                  }}
                />
              </div> */}
                    </form>
                  </Spin>
                </Modal>
                <Table
                  className="table-striped-rows"
                  dataSource={data}
                  columns={columns}
                />
                ;
              </div>
              <div class=" align-items-lg-center dot-box">
                {/* <div class="col-6"> */}
                <div class="heading-area">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5 className="mt-4" style={{ paddingBottom: "12px" }}>
                      <Tag
                        color="magenta"
                        style={{ border: "none", fontSize: "38px" }}
                      >
                        Donation Request
                      </Tag>
                    </h5>

                    <div></div>
                  </div>
                  <p>
                    <Tag color="red" style={{ fontSize: "15px" }}>
                      {" "}
                      Omniscient BloodBank
                    </Tag>
                  </p>
                  <br />
                </div>
                <Modal
                  title="Forget Password"
                  visible={forgetvis}
                  onOk={(e) => forgetpass(e)}
                  onCancel={() => setForgetvis(false)}
                >
                  {/* <Spin spinning={loading} size="large"> */}
                  <form
                    class="contact-form"
                    id="contact-form-data"
                    onSubmit={(e) => {
                      forgetpass(e);
                    }}
                  >
                    <div class="col-lg-12 row">
                      <div class="col-lg-8">
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="number"
                            placeholder="Phone"
                            name="phone "
                            onChange={(e) => {
                              setNumber(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <Button
                        onClick={sentotp}
                          style={{ background: "#ed2d34", color: "white" }}
                        >
                          sent otp
                        </Button>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Otp"
                          name="otp"
                          onChange={(e) => {
                            setOtp(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Password"
                          name="Password"
                          onChange={(e) => {
                            setPass(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </form>
                  {/* </Spin> */}
                </Modal>
                <Table
                  className="table-striped-rows"
                  dataSource={requester}
                  columns={columnss}
                  scroll={{ x: 400 }}
                />
                ; ;
              </div>
            </div>
          </div>
        </Spin>
      </section>
    </>
  );
}
