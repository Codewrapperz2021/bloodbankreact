import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Progress,
  Steps,
  Tag,
  Spin,
  Checkbox,
  message,
} from "antd";
import "antd/dist/antd.css";
import { api_base_url } from "../Constants";
import axios from "axios";
import "../style.css";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { updateDonorsData } from "../redux/actions/donors";
import { Navigate, useNavigate } from "react-router-dom";
const { Step } = Steps;
export const Donors = ({ donorsData, updateDonorsData, canFetchDonors }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [permanent, setPermanent] = useState([]);
  const [keys, setKeys] = useState([]);
  const [st, setSt] = useState([]);
  const [distance, setDistance] = useState(0);
  const [district, setDistrict] = useState([]);
  const [ct, setCt] = useState([]);
  const [requester, setRequester] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState(
    localStorage.getItem("userDetails") &&
      JSON.parse(localStorage.getItem("userDetails"))
  );
  const [hospitalCity, setHospitalCity] = useState("");
  const bloodType = useSelector((state) => state.donors.bloodType);
  useEffect(() => {
    console.log(donorsData, "test");
    fetchData();
  }, [donorsData]);
  const fetchData = async () => {
    let temp = [...donorsData];
    let temp1 = temp.map((el) => {
      return { ...el, key: el.id };
    });
    if (canFetchDonors) {
      setData(temp1);
      setPermanent(temp1);
    } else {
      await updateDonorsData();
    }
    setLoading(false);
  };
  const [searchObj, setSearchObj] = useState({});
  const [columns, setColumns] = useState([
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "y",

    //   render: (text, record) =>
    //     localStorage.getItem('token') && (
    //      <Checkbox />
    //     ),
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "sex",
    },
    {
      title: "Blood Type",
      dataIndex: "blood_type",
      key: "blood_type",
    },
    {
      title: "No of times donated",
      dataIndex: "no_times_do",
      key: "no_times_do",
    },
    {
      title: "Last donation date",
      dataIndex: "last_do_date",
      key: "last_do_date",
    },
    {
      title: "Last donation place",
      dataIndex: "last_do_place",
      key: "last_do_place",
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "time of contact",
      dataIndex: "convt_time_int",
      key: "convt_time_int",
    },
    {
      title: "Availability",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <>
          {record.do_av_blood == "BLOOD" && "blood,"}
          {record.do_av_sdp == "SDP" && "sdp,"}
          {record.do_av_ffp == "FFP" && "ffp,"}
          {record.do_av_rdp == "RDP" && "rdp,"}
          {record.do_av_wbc == "WBC" && "wbc"}
        </>
      ),
    },
    {
      title: "Distance",
      dataIndex: "hospital_state",
      key: "hospital_state",

      render: (text, record) =>
        distance == 0 && (
          <Button
            type="danger"
            onClick={() => {
              getDistance(record.city);
            }}
            style={{ marginLeft: "10px" }}
          >
            Get Distance
          </Button>
        ),
    },

    {
      title: "Send request",
      dataIndex: "id",
      key: "id",

      render: (text, record) =>
        record.status == null ? (
          <Button
            type="danger"
            onClick={() => {
              const data = {
                donor_id: [record?.id],
                requester_id: JSON.parse(localStorage.getItem("userDetails"))
                  ?.id,
                status: "0",
              };
              localStorage.getItem("token")
                ? axios
                    .post(api_base_url + "/addraisedrequest", data)
                    .then((res) => {
                     window.location.reload();
                      message.success("request sent");
                    })
                    .catch((err) => {
                      message.error("something went wrong");
                    })
                : message.error("Please Login");
            }}
            style={{ marginLeft: "10px" }}
          >
            Request
          </Button>
        ) : record.status?.status == "0" ? (
          "Requested"
        ) : record.status?.status == "1" ? (
          <Button
            type="danger"
            onClick={() => {
              const data = {
                donor_id: record?.id,
                requester_id: JSON.parse(localStorage.getItem("userDetails"))
                  ?.id,

                // requester_id: JSON.parse(localStorage.getItem("userDetails")).id,
                status: "2",
              };
              localStorage.getItem("token")
                ? axios
                    .post(api_base_url + "/updateraisedrequest2", data)
                    .then((res) => {
                      window.location.reload();
                      message.success("Thank you");
                    })
                : message.error("Please Login");
            }}
            style={{ marginLeft: "10px" }}
          >
            Click If Donated
          </Button>
        ) : record.status?.status == "2" ? (
          "Received"
        ) : (
          ""
        ),
    },
    {
      title: "Feedback",
      dataIndex: "id",
      key: "id",
      render: (text, record) =>
        record.status?.status == "2" ? (
          <Button
            type="danger"
            onClick={() =>
              localStorage.getItem("token")
                ? setVisible(true)
                : message.error("Please Login")
            }
          >
            Feedback
          </Button>
        ) : (
          <Button
            onClick={() =>
              !localStorage.getItem("token") && message.error("Please Login")
            }
            type="danger"
          >
            Feedback
          </Button>
        ),
    },
  ]);
  const getDistance = (record) => {
    fetch(
      `https://www.mapquestapi.com/directions/v2/route?key=AXj4OC6T2gtJyy0WDsu9pI0PGHlqFhPA&from=${city.city}&to=${record}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDistance(data.route.distance * 1.60934);
        setHospitalCity(record);
      });
  };
  const handleStateChange = (e) => {
    axios
      .post(api_base_url + "/getAllDistrictByStates", {
        state_id: e.target.value,
      })
      .then((res) => setDistrict(res.data));
  };
  const handleDistrictChange = (e) => {
    axios
      .post(api_base_url + "/getAllCityByDistrict", {
        districtid: e.target.value,
      })
      .then((res) => setCt(res.data));
  };
  useEffect(() => {
    axios.post(api_base_url + "/getAllStates").then((res) => {
      const st = res.data;
      setSt(st);
    });
  }, []);
  const search = async () => {
    console.log("saransh", searchObj);
    let temp = [...permanent];
    if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("city") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.state == searchObj.state &&
          el.district == searchObj.district &&
          el.city == searchObj.city &&
          el.blood_type == searchObj.blood_type
        );
      });
      console.log("search");
      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("city")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.state == searchObj.state &&
          el.district == searchObj.district &&
          el.city == searchObj.city
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.state == searchObj.state &&
          el.district == searchObj.district &&
          el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("city") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.state == searchObj.state &&
          el.city == searchObj.city &&
          el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("city") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.district == searchObj.district &&
          el.city == searchObj.city &&
          el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("district")
    ) {
      let temp1 = temp.filter((el) => {
        return el.state == searchObj.state && el.district == searchObj.district;
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("city")
    ) {
      let temp1 = temp.filter((el) => {
        return el.state == searchObj.state && el.city == searchObj.city;
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("state") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.state == searchObj.state && el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("city")
    ) {
      let temp1 = temp.filter((el) => {
        return el.district == searchObj.district && el.city == searchObj.city;
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("district") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.district == searchObj.district &&
          el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (
      searchObj.hasOwnProperty("city") &&
      searchObj.hasOwnProperty("blood_type")
    ) {
      let temp1 = temp.filter((el) => {
        return (
          el.city == searchObj.city && el.blood_type == searchObj.blood_type
        );
      });

      setData(temp1);
    } else if (searchObj.hasOwnProperty("city")) {
      let temp1 = temp.filter((el) => {
        return el.city == searchObj.city;
      });

      setData(temp1);
    } else if (searchObj.hasOwnProperty("blood_type")) {
      let temp1 = temp.filter((el) => {
        return el.blood_type == searchObj.blood_type;
      });

      setData(temp1);
    } else if (searchObj.hasOwnProperty("state")) {
      let temp1 = temp.filter((el) => {
        return el.state == searchObj.state;
      });

      setData(temp1);
    } else if (searchObj.hasOwnProperty("district")) {
      let temp1 = temp.filter((el) => {
        return el.district == searchObj.district;
      });

      setData(temp1);
    }
  };
  const handleStateFilter = (e) => {
    // const temp = data.filter(el=>{return el.st==e.target.name} )
    let name = document.getElementsByName(e.target.value + "state")[0]
      .innerText;

    setSearchObj({ ...searchObj, state: name });

    // setData(temp)
  };
  const handleDistrictFilter = (e) => {
    // const temp = data.filter(el=>{return el.st==e.target.name} )
    let name = document.getElementsByName(e.target.value + "district")[0]
      .innerText;

    setSearchObj({ ...searchObj, district: name });
    // setData(temp)
  };
  const handleCityFilter = (e) => {
    // const temp = data.filter(el=>{return el.st==e.target.name} )
    let name = document.getElementsByName(e.target.value + "city")[0].innerText;

    setSearchObj({ ...searchObj, city: name });

    // setData(temp)
  };

  const handleBloodFilter = (e) => {
    //   const temp = data.filter(el=>{return el.blood_type==e.target.value})
    // setData(temp)
    searchObj.blood_type = e.target.value;
    setSearchObj({ ...searchObj, blood_type: e.target.value });
  };
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setKeys(selectedRowKeys);
      console.log("selectedRows: ", selectedRows);
      console.log("selectedKeys", selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  useEffect(() => {
    GetRequesterData();
  }, []);
  const GetRequesterData = () => {
    // if (localStorage.getItem("token") == null) window.location.hash = "home";
    // else {
    axios.get(`${api_base_url}/raisedlist`).then((res) => {
      const response = res.data;
      const temp1 = response.filter((el) => {
        return (
          el.email != JSON.parse(localStorage.getItem("userDetails")).email &&
          el.donor_id == JSON.parse(localStorage.getItem("userDetails"))?.id
        );
      });
      setRequester(temp1);
    });
  };
  // };
  const addFeedback = () => {
    let id = JSON.parse(localStorage.getItem("userDetails"))?.id;
    const data = { description: feedback, user_id: id };
    axios
      .post(api_base_url + "/addfeedback", data)
      .then((res) => {
        message.success("Feedback posted");
        setVisible(false);
      })
      .catch((err) => {
        message.error("Something Went Wrong");
      });
  };

  return (
    <section
      id="donors"
      // class="pt-page pt-page-6 pt-5"
      className="my_section"
      data-id="donors"
      style={{}}
    >
      <Modal
        title="Feedback form"
        visible={visible}
        onOk={addFeedback}
        onCancel={() => setVisible(false)}
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
      <Spin size="large" spinning={loading}>
        <div class="container mt-4" id="content">
          <div class=" align-items-lg-center dot-box">
            {/* <div class="col-6"> */}
            <div class="heading-area" style={{ paddingBottom: "12px" }}>
              <p style={{ paddingBottom: "12px" }}>
                <Tag
                  color="magenta"
                  style={{ border: "none", fontSize: "38px" }}
                >
                  {" "}
                  Donor's Data
                </Tag>
              </p>
              <p>
                <Tag color="red" style={{ fontSize: "15px" }}>
                  {" "}
                  Omniscient BloodBank
                </Tag>
              </p>
            </div>
            <div
              className="p-4 "
              style={{
                display: "flex",
                backgroundColor: " #b7243a",
                width: "105%",
                marginLeft: "-2%",
                borderRadius: "4px",
              }}
            >
              <div>
                <div style={{ color: "white" }}>Select State</div>
                <select
                  class="form-control"
                  name="st"
                  onChange={(e) => {
                    handleStateChange(e);
                    handleStateFilter(e);
                  }}
                  // value={localStorage.getItem("state")}
                >
                  {localStorage.getItem("state") && (
                    <option selected disabled>
                      {localStorage.getItem("state")}
                    </option>
                  )}
                  <option>All</option>;
                  {st.map((stt) => {
                    return (
                      <option
                        value={stt.state_id}
                        name={stt.state_id + "state"}
                      >
                        {stt.state_title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                style={{ marginTop: "3%", marginLeft: "2%", color: "white" }}
              >
                <i class="lni lni-angle-double-right"></i>
              </div>
              <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                <div style={{ color: "white" }}>Select District</div>
                <select
                  class="form-control"
                  name="District"
                  onChange={(e) => {
                    handleDistrictChange(e);
                    handleDistrictFilter(e);
                  }}
                >
                  {localStorage.getItem("district") && (
                    <option selected disabled>
                      {localStorage.getItem("district")}
                    </option>
                  )}
                  <option>All</option>;
                  {district.map((dt) => {
                    return (
                      <option
                        name={dt.districtid + "district"}
                        value={dt.districtid}
                      >
                        {dt.district_title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                style={{
                  marginTop: "3%",
                  marginLeft: "1%",
                  marginRight: "1%",
                  color: "white",
                }}
              >
                <i class="lni lni-angle-double-right"></i>
              </div>
              <div>
                <div style={{ color: "white" }}>Select City</div>
                <select
                  class="form-control"
                  name="city"
                  onChange={(e) => {
                    handleCityFilter(e);
                  }}
                >
                  {" "}
                  {localStorage.getItem("city") && (
                    <option selected disabled>
                      {localStorage.getItem("city")}
                    </option>
                  )}
                  <option>All</option>;
                  {ct.map((ctt) => {
                    return (
                      <option name={ctt.id + "city"} value={ctt.id}>
                        {ctt.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                style={{ marginTop: "3%", marginLeft: "2%", color: "white" }}
              >
                <i class="lni lni-angle-double-right"></i>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div style={{ color: "white" }}>Select Blood Type</div>
                <select
                  class="form-control"
                  name="blood_type"
                  onChange={(e) => {
                    handleBloodFilter(e);
                  }}
                  value={localStorage.getItem("blood_type")}
                >
                  <option>All</option>;
                  {bloodType.map((st) => {
                    return <option>{st}</option>;
                  })}
                </select>
              </div>
              <div>
                <div></div>{" "}
                <Button
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                  type="danger"
                  onClick={search}
                >
                  {" "}
                  Search
                </Button>
                {/* <Button
                style={{ marginTop: "20px", marginLeft: "20px" }}
                type="danger"
                onClick={()=>navigate("/requestblood")}
              >
                {" "}
                Request donar
              </Button> */}
                <Button
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                  type="danger"
                  onClick={() => {
                    const data = {
                      donor_id: keys,
                      requester_id: JSON.parse(
                        localStorage.getItem("userDetails")
                      )?.id,
                      status: "0",
                    };
                    axios
                      .post(api_base_url + "/addraisedrequest", data)
                      .then((res) => {
                        message.success("All requests are sent");
                      })
                      .catch((err) => {
                        message.error("something went wrong");
                      });
                  }}
                >
                  {" "}
                  Send Selected
                </Button>
              </div>
            </div>
            <br></br>
            {/* <Steps  size="small" current={4}>
              <Step title={localStorage.getItem("blood_type")} />
              <Step  title={localStorage.getItem("state")} />
              <Step title={localStorage.getItem("district")} />
              <Step title={localStorage.getItem("city")} />
            </Steps>
            <br></br> */}
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              className="table-striped-rows"
              dataSource={data}
              columns={columns}
              style={{ overflow: "scroll" }}
            />
            ;
          </div>
        </div>
      </Spin>
      <Modal
        title="Distance"
        visible={distance != 0}
        onOk={() => setDistance(0)}
        onCancel={() => setDistance(0)}
      >
        Your Distance From Your city {city?.city} to Hospital City
        {hospitalCity} is {distance} km
      </Modal>
    </section>
  );
};

const mapStateToProps = (state) => ({
  donorsData: state.donors.donorsData,
  canFetchDonors: state.donors.canFetchDonors,
});

const mapDispatchToProps = { updateDonorsData };

export default connect(mapStateToProps, mapDispatchToProps)(Donors);
