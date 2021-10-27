import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { GET_ALL_ITEMS } from "../config/ApiConfig";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Items = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editableItem, setEditableItem] = React.useState({});
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = () => {
    axios.get(GET_ALL_ITEMS).then((res) => {
      setItems(res.data.body);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsEditMode(false)
    reset()
    setEditableItem({})
    setOpen(false);
  };

  const onSubmit = (data) => {
      var postData = {...data}
      if(isEditMode) {
        postData['id'] = editableItem.id;
      }
    axios.post(GET_ALL_ITEMS, postData).then(
      (res) => {
        setOpen(false);
        getAllItems();
        reset();
        toast.success(`Successfully ${isEditMode?'updated': 'added'} new item!`);
        setEditableItem({})
      },
      (err) => {
        toast.error("Failed! Please try again.");
      }
    );
  };

  const deleteHandler = (id) => {
    axios.delete(`${GET_ALL_ITEMS}/${id}`).then(
      (res) => {
        toast.success("Successfully deleted item!");
        getAllItems();
      },
      (err) => {
        toast.error("Failed! Please try again.");
      }
    );
  };

  const updateHandler=(item)=>{
    setIsEditMode(true)
    setEditableItem(item)
    setOpen(true);
    const fields = ['itemName', 'itemImage', 'itemDescription', 'qty', 'unitPrice'];
    fields.forEach(field => setValue(field, item[field]));
  }

  return (
    <DashboardLayout>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button class="btn btn-primary" onClick={handleClickOpen}>
            New
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Item Type</th>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Unit Price (Rs)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <img
                      style={{ width: 40 }}
                      src={item.itemImage}
                      alt="item"
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.itemType}</td>
                  <td>{item.itemDescription.substr(0, 100)}...</td>
                  <td>{item.qty}</td>
                  <td>{item.unitPrice}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-info"
                      onClick={() => updateHandler(item)}
                    >
                      Edit
                    </button> &nbsp;
                    <button
                      class="btn btn-sm btn-danger"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode? 'Update Item':'New Item'}</DialogTitle>
        <DialogContent>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Item Name</label>
              <input
            //   defaultValue={editableItem.itemName}
                style={Styles.fieldStyle}
                type="text"
                name="itemName"
                placeholder="Item Name"
                {...register("itemName")}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Item Type</label>
              <select
                //  defaultValue={editableItem.itemType}
                {...register("itemType")}
                style={Styles.fieldStyle}
                name="itemType"
              >
                <option value={0}>SERVICE</option>
                <option value={1}>PRODUCT</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Item Image</label>
              <input
                // defaultValue={editableItem.itemImage}
                {...register("itemImage")}
                style={Styles.fieldStyle}
                type="text"
                name="itemImage"
                placeholder="Item Image Url"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Item Description</label>
              <input
            //    defaultValue={editableItem.itemDescription}
                {...register("itemDescription")}
                style={Styles.fieldStyle}
                type="text"
                name="itemDescription"
                placeholder="Item Description"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Qty</label>
              <input
            //   defaultValue={editableItem.qty}
                {...register("qty")}
                style={Styles.fieldStyle}
                type="text"
                name="qty"
                placeholder="Qty"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Unit Price</label>
              <input
                // defaultValue={editableItem.unitPrice}
                {...register("unitPrice")}
                style={Styles.fieldStyle}
                type="text"
                name="unitPrice"
                placeholder="Unit Price"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
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

export default Items;
