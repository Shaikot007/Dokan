import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import config from "../../config";

function SignUp() {

  const url = `${config.api_url}/signup`;

  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone_number: "",
    address: "",
    post_office: "",
    police_station: "",
    city: "",
    zip: "",
    country: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues(
      {
        ...values,
        [event.target.name]: event.target.value
      }
    );
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!values.user_name) {
      formIsValid = false;
      errors.user_name = "Name required";
    }
    else if (!/^[a-zA-Z]+$/.test(values.user_name)) {
      formIsValid = false;
      errors.user_name = "Enter only letters";
    };

    if (!values.user_email) {
      formIsValid = false;
      errors.user_email = "Email required";
    }
    else if (!/\S+@\S+\.\S+/.test(values.user_email)) {
      formIsValid = false;
      errors.user_email = "Email address invalid";
    };

    if (!values.user_password) {
      formIsValid = false;
      errors.user_password = "Password required";
    }
    else if (values.user_password.length < 6) {
      formIsValid = false;
      errors.user_password = "Password needs to be 6 characters or more";
    };

    if (!values.user_phone_number) {
      formIsValid = false;
      errors.user_phone_number = "Phone number required";
    }
    else if (!/[0-9]{11}/.test(values.user_phone_number)) {
      formIsValid = false;
      errors.user_phone_number = "Phone number invalid";
    };

    if (!values.address) {
      formIsValid = false;
      errors.address = "Address required";
    };

    if (!values.post_office) {
      formIsValid = false;
      errors.post_office = "Post office required";
    }
    else if (!/^[a-zA-Z]+$/.test(values.post_office)) {
      formIsValid = false;
      errors.post_office = "Enter only letters";
    };

    if (!values.police_station) {
      formIsValid = false;
      errors.police_station = "Police station required";
    }
    else if (!/^[a-zA-Z]+$/.test(values.police_station)) {
      formIsValid = false;
      errors.police_station = "Enter only letters";
    };

    if (!values.city) {
      formIsValid = false;
      errors.city = "City required";
    }
    else if (!/^[a-zA-Z]+$/.test(values.city)) {
      formIsValid = false;
      errors.city = "Enter only letters";
    };

    if (!values.zip) {
      formIsValid = false;
      errors.zip = "Zip required";
    }
    else if (!/[0-9]{4}/.test(values.zip)) {
      formIsValid = false;
      errors.zip = "Zip invalid";
    };

    if (!values.country) {
      formIsValid = false;
      errors.country = "Country required";
    }
    else if (!/^[a-zA-Z]+$/.test(values.country)) {
      formIsValid = false;
      errors.country = "Enter only letters";
    };

    setErrors(errors);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //Submit to API
      axios.post(url, values)
        .then(response => response.status === 200 ? alert("Sign up successful.") : null,
          setValues({
            user_name: "",
            user_email: "",
            user_password: "",
            user_phone_number: "",
            address: "",
            post_office: "",
            police_station: "",
            city: "",
            zip: "",
            country: ""
          }))
        .catch(error => error.response.status === 400 ? alert(error.response.data.message) : null);
    } else {
      alert("Sign up failed.")
    }
  };

  return (
    <div className="SignUp">
      <h3>Sign up</h3>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="user_name" id="name" onChange={handleChange} value={values.user_name} placeholder="Enter your name" />
          <p>{errors.user_name}</p>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="user_email" id="email" onChange={handleChange} value={values.user_email} placeholder="Enter your email" />
          <p>{errors.user_email}</p>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="user_password" onChange={handleChange} value={values.user_password} placeholder="Enter your password" />
          <p>{errors.user_password}</p>
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone number</Label>
          <Input type="tel" name="user_phone_number" id="phone" onChange={handleChange} value={values.user_phone_number} placeholder="Enter your phone number" />
          <p>{errors.user_phone_number}</p>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={handleChange} value={values.address} placeholder="Street address, apartment or floor" />
          <p>{errors.address}</p>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="postOffice">Post office</Label>
              <Input type="text" name="post_office" id="postOffice" onChange={handleChange} value={values.post_office} placeholder="Post office" />
              <p>{errors.post_office}</p>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="policeStation">Police station</Label>
              <Input type="text" name="police_station" id="policeStation" onChange={handleChange} value={values.police_station} placeholder="Police station" />
              <p>{errors.police_station}</p>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" onChange={handleChange} value={values.city} placeholder="City" />
              <p>{errors.city}</p>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="zip">Zip</Label>
              <Input type="text" name="zip" id="zip" onChange={handleChange} value={values.zip} placeholder="Zip" />
              <p>{errors.zip}</p>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input type="text" name="country" id="country" onChange={handleChange} value={values.country} placeholder="Country" />
              <p>{errors.country}</p>
            </FormGroup>
          </Col>
        </Row>
        <Link to="/signin">
          <Button color="warning" onClick={handleSubmit}>Sign up</Button>
        </Link>
      </Form>
    </div>
  );
};

export default SignUp;
