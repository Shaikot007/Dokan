import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import config from "../../config";

function ForgotPassword() {

  const url = `${config.api_url}/forgetpassword`;

  const [email, setEmail] = useState({
    user_email: ""
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setEmail(
      {
        ...email,
        [event.target.name]: event.target.value
      }
    );
  };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!email.user_email) {
      formIsValid = false;
      error.user_email = "Email required";
    }
    else if (!/\S+@\S+\.\S+/.test(email.user_email)) {
      formIsValid = false;
      error.user_email = "Email address invalid";
    };

    setError(error);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //Submit to API
      axios.post(url, email)
        .then(response => response.status === 200 ?
          alert(response.data.message) : null,
          setEmail({
            user_email: ""
          })
        )
        .catch(error => error.response.status !== 200 ? alert(error.response.data.message) : null);
    } else {
      alert("Authentication failed.")
    }
  };

  return (
    <div className="ForgotPassword">
      <h3>Let's get you into your account</h3>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="user_email" id="email" onChange={handleChange} value={email.user_email} placeholder="Enter your email" />
          <p>{error.user_email}</p>
        </FormGroup>
        <Button color="warning" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
