import React, { useState, useEffect } from 'react';
import axios from "axios";
import { api_base_url } from '../../../Constants';
import Main from ".././layout/Main";
import { Table, Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function () {
    const [requester, setRequester] = useState([]);
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
            render: (text, record) => (
                record.status == "0" ?
                    "Sent" :record.status == "1" ? "Accepted" :"Donated"
            ),
        },
    ]);

    useEffect(() => {
        axios
            .get(`${api_base_url}/raisedlist`)
            .then((res) => {
                const response = res.data;
                setRequester(response);
            });
    }, []);

    return (
        <Main>
            <Row style={{ marginLeft: '22px' }}>
                <Col className="header-control">
                    <Input
                        className="header-search"
                        placeholder="Search..."
                        // onChange={(e) => onSearch(e.target.value)}
                        prefix={<SearchOutlined />}
                    />
                </Col>
            </Row>
            <Table
                dataSource={requester}
                columns={columnss}
                scroll={{ x: 400 }}
            />
        </Main>
    )
}
