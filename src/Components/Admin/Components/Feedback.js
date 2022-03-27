import React, { useState, useEffect }  from 'react'
import axios from "axios";
import { api_base_url } from '../../../Constants';
import Main from ".././layout/Main";
import { Table, Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [columnss, setColumnss] = useState([
        {
            title: "Name",
            dataIndex: "user.name",
            key: "user.name",
            render: (text, record) => (
            record.user.name
              ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ]);

    useEffect(() => {
        axios
            .get(`${api_base_url}/feedback`)
            .then((res) => {
                const response = res.data;
                setFeedback(response);
            });
    }, []);

    return (
        <Main>
            {/* <Row style={{ marginLeft: '22px' }}>
                <Col className="header-control">
                    <Input
                        className="header-search"
                        placeholder="Search..."
                        // onChange={(e) => onSearch(e.target.value)}
                        prefix={<SearchOutlined />}
                    />
                </Col>
            </Row> */}
            <Table
                dataSource={feedback}
                columns={columnss}
                scroll={{ x: 400 }}
            />
        </Main>
    )
}
