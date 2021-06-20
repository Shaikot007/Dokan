import React, { useState } from "react";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchOrderAction } from "../../Redux/Action/OrderAction";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import config from "../../config";

function SignIn() {

  const dispatch = useDispatch();

  const url = `${config.api_url}/signin`;

  const [user, setUser] = useState({
    user_email: "",
    user_password: ""
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setUser(
      {
        ...user,
        [event.target.name]: event.target.value
      }
    );
  };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!user.user_email) {
      formIsValid = false;
      error.user_email = "Email required";
    }
    else if (!/\S+@\S+\.\S+/.test(user.user_email)) {
      formIsValid = false;
      error.user_email = "Email address invalid";
    };

    if (!user.user_password) {
      formIsValid = false;
      error.user_password = "Password required";
    };

    setError(error);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //Submit to API
      axios.post(url, user)
        .then(response => response.status === 200 ?
          localStorage.setItem("myToken", response.data.access_token) +
          localStorage.setItem("userName", response.data.user_name) +
          dispatch(fetchOrderAction()) +
          alert(response.data.message) : null,
          setUser({
            user_email: "",
            user_password: ""
          })
        )
        .catch(error => error.response.status !== 200 ? alert(error.response.data.message) : null);
    } else {
      alert("Sign in failed.")
    }
  };

  return (
    <div className="SignIn">
      <h3>Sign in</h3>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="user_email" id="email" onChange={handleChange} value={user.user_email} placeholder="Enter your email" />
          <p>{error.user_email}</p>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="user_password" id="password" onChange={handleChange} value={user.user_password} placeholder="Enter your password" />
          <p>{error.user_password}</p>
        </FormGroup>
        <Link to="/cartlist">
          <Button color="warning" onClick={handleSubmit}>Sign in</Button>
        </Link>
      </Form>
      <Link to="/forgotpassword">
        <p>Forgot password?</p>
      </Link>
      <h6>Don't have an account?
        <Link to="/signup">
          <strong>Sign up</strong>
        </Link>
      </h6>
    </div>
  );
};

export default SignIn;
