import React, { useEffect, useState } from "react";
import { logout } from "../redux/User";
import { connect } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import {
  GET_ITEM_COUNT,
  GET_ORDER_COUNT,
  GET_USER_COUNT,
} from "../config/ApiConfig";

const Home = (props) => {
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    getUserCount();
    getOrderCount();
    getItemCount();
  }, []);

  const getUserCount = () => {
    axios.get(GET_USER_COUNT).then((res) => {
      setUserCount(res.data.body);
    });
  };

  const getItemCount = () => {
    axios.get(GET_ITEM_COUNT).then((res) => {
      setItemCount(res.data.body);
    });
  };

  const getOrderCount = () => {
    axios.get(GET_ORDER_COUNT).then((res) => {
      setOrderCount(res.data.body);
    });
  };

  return (
    <DashboardLayout>
      {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={props.logout}>Logout</button>
        </div> */}
      <div className="container">
        <h3>Statistic</h3>
        <div className="row">
          <div className="col col-4">
            <div
              class="card text-white bg-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div class="card-header">Total Users</div>
              <div class="card-body">
                <h5 class="card-title">{userCount}</h5>
              </div>
            </div>
          </div>
          <div className="col col-4">
            <div
              class="card text-white bg-success mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div class="card-header">Total Orders</div>
              <div class="card-body">
                <h5 class="card-title">{orderCount}</h5>
              </div>
            </div>
          </div>
          <div className="col col-4">
            <div
              class="card text-white bg-warning mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div class="card-header">Total Items</div>
              <div class="card-body">
                <h5 class="card-title">{itemCount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default connect(null, { logout })(Home);
