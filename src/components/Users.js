/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

function Users() {
  const [state, setState] = useState({
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      console.log(res.data);
      setState({
        users: res.data,
      });
    });
  }, []);
  console.log(state);

  const columns = [
    { field: "id", headerName: "ID", width: 200, sortable: true },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 150,
    },
  ];

  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid rows={state.users} columns={columns} checkboxSelection />
      </div>
    </>
  );
}

export default Users;
