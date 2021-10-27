// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import { Tab, Tabs } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { SALES_FETCH } from "../config/ApiConfig";

const Reports = () => {
  const [value, setValue] = React.useState(0);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [sales, setSales] = useState([]);
  const [orderStatus, setOrderStatus] = useState("DELIVERED");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const changeOrderStatus = (val) => {
    setOrderStatus(val);
  };

  const fetchSales = () => {
    axios
      .get(
        `${SALES_FETCH}${orderStatus}?startDate=${moment(startDate).format(
          "YYYY/MM/DD"
        )}&endDate=${moment(endDate).format("YYYY/MM/DD")}`
      )
      .then((res) => {
        setSales(res.data.body);
      });
  };

  const salesTab = () => {
    return (
      <div>
        <div className="row mt-3 mb-3">
          <div className="col form-group">
            <label for="startDate">Start Date:</label>
            <input
              defaultValue={startDate}
              style={Styles.fieldStyle}
              type="date"
              id="startDate"
              name="startDate"
            />
          </div>
          <div className="col form-group">
            <label for="endDate">End Date:</label>
            <input
              defaultValue={endDate}
              style={Styles.fieldStyle}
              type="date"
              id="endDate"
              name="endDate"
            />
          </div>
          <div className="col form-group">
            <label for="endDate">By Status</label>
            <select
              style={{
                border: "1px solid #000",
                backgroundColor: "#fff",
                color: "rgb(0, 0, 0)",
              }}
              defaultValue={orderStatus}
              onChange={(e) => {
                changeOrderStatus(e.target.value);
              }}
            >
              <option value={"PENDING"}>PENDING</option>
              <option value={"ORDER_CONFIRMED"}>ORDER_CONFIRMED</option>
              <option value={"ORDER_DECLINED"}>ORDER_DECLINED</option>
              <option value={"ORDER_CANCELED"}>ORDER_CANCELED</option>
              <option value={"REFUNDED"}>REFUNDED</option>
              <option value={"DISPATCHED"}>DISPATCHED</option>
              <option value={"DELIVERED"}>DELIVERED</option>
            </select>
          </div>
          <div
            class="col form-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              onClick={fetchSales}
              className="btn btn-sm btn-primary"
              type="button"
              value="Fetch Data"
            />{" "}
            &nbsp;
            <input
              className="btn btn-sm btn-success"
              type="button"
              value="Generate PDF"
            />
          </div>
        </div>
        <div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Date</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      <img
                        style={{ width: 40 }}
                        src={item.item.itemImage}
                        alt="item"
                      />
                    </td>
                    <td>{item.item.itemName}</td>
                    <td>{moment(item.orderedAt).format("MMMM Do YYYY")}</td>
                    <td>{item.qty}</td>
                    <td>{item.orderStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const itemsTab = () => {
    return (
      <div>
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" />
        </div>
        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" />
        </div>
      </div>
    );
  };

  const usersTab = () => {
    return (
      <div>
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" />
        </div>
        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" />
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Sales" />
          <Tab label="Items" />
          <Tab label="Users" />
        </Tabs>
        <div>
          {value == 0 && salesTab()}
          {value == 1 && itemsTab()}
          {value == 2 && usersTab()}
        </div>
      </div>
    </DashboardLayout>
  );
};

const Styles = {
  fieldStyle: {
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "rgb(0, 0, 0)",
  },
};

export default Reports;
