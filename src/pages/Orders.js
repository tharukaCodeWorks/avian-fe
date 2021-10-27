import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { GET_ALL_ORDERS } from "../config/ApiConfig";
import { toast } from 'react-toastify';
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    axios.get(GET_ALL_ORDERS).then((res) => {
      setOrders(res.data.body);
    });
  };

  const changeOrderStatus=(id, option)=>{
      let data = {

      }
      axios.put(`${GET_ALL_ORDERS}/${id}/${option}`).then(res=>{
          toast.success("Order status changed successfully!")
      })
  }

  return (
    <DashboardLayout>
      <div className="container">
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
            {orders.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <img style={{width: 40}} src={item.item.itemImage} alt="item" />
                  </td>
                  <td>{item.item.itemName}</td>
                  <td>{ moment(item.orderedAt).format('MMMM Do YYYY')}</td>
                  <td>{item.qty}</td>
                  <td>
                    <select
                      style={{
                        border: "1px solid #000",
                        backgroundColor: "#fff",
                        color: "rgb(0, 0, 0)",
                      }}
                      defaultValue={item.orderStatus}
                      onChange={(e)=>{changeOrderStatus(item.id, e.target.value)}}
                    >
                      <option value={'PENDING'}>PENDING</option>
                      <option value={'ORDER_CONFIRMED'}>ORDER_CONFIRMED</option>
                      <option value={'ORDER_DECLINED'}>ORDER_DECLINED</option>
                      <option value={'ORDER_CANCELED'}>ORDER_CANCELED</option>
                      <option value={'REFUNDED'}>REFUNDED</option>
                      <option value={'DISPATCHED'}>DISPATCHED</option>
                      <option value={'DELIVERED'}>DELIVERED</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
