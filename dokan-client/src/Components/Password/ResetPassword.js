import React, { useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import config from "../../config";
import { useParams } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams();
  const { id } = useParams();

  const url = `${config.api_url}/resetpassword/${token}/${id}`;

  const [password, setPassword] = useState({
    user_password: "",
    confirm_password: ""
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setPassword(
      {
        ...password,
        [event.target.name]: event.target.value
      }
    );
  };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!password.user_password) {
      formIsValid = false;
      error.user_password = "Password required";
    }
    else if (password.user_password.length < 6) {
      formIsValid = false;
      error.user_password = "Password needs to be 6 characters or more";
    };

    if (!password.confirm_password) {
      formIsValid = false;
      error.confirm_password = "Password required";
    }
    else if (password.confirm_password !== password.user_password) {
      formIsValid = false;
      error.confirm_password = "Passwords do not match";
    }

    setError(error);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //Submit to API
      axios.patch(url, password)
        .then(response => response.status === 200 ?
          alert("Password reset done successfully.") : null,
          setPassword({
            user_password: "",
            confirm_password: ""
          })
        )
        .catch(error => error.response.status !== 200 ? alert("Password reset failed.") : null);
    } else {
      alert("Password reset failed.")
    }
  };

  return (
    <div className="ResetPassword">
      <h3>Let's reset your password</h3>
      <Form>
        <FormGroup>
          <Label for="password1">New password</Label>
          <Input type="password" name="user_password" id="password1" onChange={handleChange} value={password.user_password} placeholder="Enter your new password" />
          <p>{error.user_password}</p>
        </FormGroup>
        <FormGroup>
          <Label for="password2">Re-type new password</Label>
          <Input type="password" name="confirm_password" id="password2" onChange={handleChange} value={password.confirm_password} placeholder="Re-type your new password" />
          <p>{error.confirm_password}</p>
        </FormGroup>
        <Button color="warning" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
