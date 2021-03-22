/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  let { name, email, age } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    age = parseInt(age);
    const newUser = {
      name,
      email,
      age,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const body = JSON.stringify(newUser);
      console.log("body: ", body);
      const res = await axios.post("http://localhost:5000/users", body, config);
      setFormData({
        name: "",
        email: "",
        age: "",
      });
      alert("The User Has Been Added!");
      console.log("data: ", res.data);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      }
    }
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="Email Address"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="age"
              value={age}
              onChange={(e) => onChange(e)}
              placeholder="age"
              name="age"
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
      </section>
    </div>
  );
};

export default Register;
