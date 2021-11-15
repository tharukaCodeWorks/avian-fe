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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  reportHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
});

const Reports = () => {
  const [value, setValue] = React.useState(0);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [sales, setSales] = useState([]);
  const [orderStatus, setOrderStatus] = useState("DELIVERED");
  const [totalSale, setTotalSale] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const changeOrderStatus = (val) => {
    setOrderStatus(val);
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ border: "1px solid #000000", margin: 10 }}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#cccccc",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: "24px" }}>
              Sales Report
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 14 }}>Start Date: {startDate}</Text>
              <Text style={{ fontSize: 14 }}>End Date: {endDate}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14 }}>Generated: {today}</Text>
              <Text style={{ fontSize: 14 }}>Order Status: {orderStatus}</Text>
            </View>
          </View>
        </View>
        <View style={{ margin: 10, border: "1px solid #000000" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #000000",
              padding: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 14,  width: 70 }}>Order ID</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, width: 170 }}>Item Name</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, width: 75 }}>Date</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14,  width: 75 }}>QTY</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, width: 110  }}>Unit Price</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14 }}>Total</Text>
            </View>
          </View>

          {sales.map((item) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid #cccccc",
                  padding: 10,
                }}
              >
                <View>
                  <Text style={{ fontSize: 11, width: 70 }}>{item.id}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 11, width: 170 }}>{item.item.itemName}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 11, width: 75 }}>{moment(item.orderedAt).format("YYYY-MM-DD")}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 11, width: 75 }}>{item.qty}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 11, width: 110 }}>{item.item.unitPrice}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 11 }}>{item.item.unitPrice*item.qty}</Text>
                </View>
              </View>
            );
          })}
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: 10}}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>TOTAL:</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Rs {totalSale}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const fetchSales = () => {
    axios
      .get(
        `${SALES_FETCH}${orderStatus}?startDate=${moment(startDate).format(
          "YYYY/MM/DD"
        )}&endDate=${moment(endDate).format("YYYY/MM/DD")}`
      )
      .then((res) => {
        setSales(res.data.body);
        generateTotalSale(res.data.body)
      });
  };

  const generateTotalSale=(saleList)=>{
    let tot = 0
    saleList.forEach(item=>{
      tot += (item.qty*item.item.unitPrice)
    })
    setTotalSale(tot)
  }

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
            style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
          >
            <input
              onClick={fetchSales}
              className="btn btn-sm btn-primary"
              type="button"
              value="Fetch Data"
              style={{height: 'fit-content'}}
            />{" "}
            &nbsp;
            {/* <input
              className="btn btn-sm btn-success"
              type="button"
              value="Generate PDF"
              // onClick={generatePdf}
            /> */}
             <PDFDownloadLink className="btn btn-sm btn-success" document={<MyDocument />} fileName="report.pdf" style={{height: 'fit-content'}}>
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Generate PDF')}
            </PDFDownloadLink>
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
          {/* <Tab label="Items" />
          <Tab label="Users" /> */}
        </Tabs>
        <div>
          {value == 0 && salesTab()}
          {/* {value == 1 && itemsTab()}
          {value == 2 && usersTab()} */}
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
