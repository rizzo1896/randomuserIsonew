import { Container, Button } from "@mui/material";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { Container } from './styles';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isCreated, setIsCreated] = useState(false);

  const handleRegister = async () => {
    const { email, password, name } = values;
    const data = { email, password, name };
    await axios
      .post("http://www.techrizzo.com/auth/register", data)
      .then((res) => {
        setTimeout(() => {
          setIsCreated(true);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCep = async () => {
    const { zip } = values;

    await axios
      .get(`https://viacep.com.br/ws/${zip}/json/`)
      .then((res) => {
        setValues({
          ...values,
          address: `${res.data.logradouro} - ${res.data.bairro}`,
          city: res.data.localidade,
          state: res.data.uf,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="sm"
    >
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label
              onClick={handleCep}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Zip - Search here
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setValues({ ...values, zip: e.target.value });
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={values.city}
              onChange={(e) => setValues({ ...values, city: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              value={values.state}
              onChange={(e) => setValues({ ...values, state: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={(e) => setValues({ ...values, address: e.target.value })}
            value={values.address}
          />
        </Form.Group>

        {isCreated && <div>User created! Redirecting...</div>}
        <Button variant="contained" onClick={handleRegister}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
