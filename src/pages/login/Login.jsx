import { Container, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msgWrong, setMsgWrong] = useState(false);
  const [msgWrongPass, setMsgWrongPass] = useState(false);

  const handleLogin = async () => {
    if (values.password.length < 4 || values.password.length > 10) {
      setMsgWrongPass(true);
      return;
    }
    setLoading(true);
    await axios
      .post("http://www.techrizzo.com/auth/authenticate", values)
      .then((res) => {
        if (
          signIn({
            token: res.data.token,
            expiresIn: 60,
            tokenType: "Bearer",
            authState: res.data.user,
            // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
            // refreshTokenExpireIn: res.data.refreshTokenExpireIn,
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something
          navigate("/home");
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if (err.response.data.error === "User not found") {
            setMsgWrong(true);
          }
          if (err.response.data.error === "Invalid password") {
            setMsgWrongPass(true);
          }
        }
        setLoading(false);
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
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            error={msgWrong ? true : false}
            id="outlined-error"
            label="E-mail"
            onChange={(e) => {
              setMsgWrong(false);
              setValues({ ...values, email: e.target.value });
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            error={msgWrongPass ? true : false}
            id="filled-error"
            label="Password"
            type="password"
            onChange={(e) => {
              setMsgWrongPass(false);
              setValues({ ...values, password: e.target.value });
            }}
          />
          <small>
            <Link to="/register">go to register</Link>
          </small>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={loading ? true : false}
            loadingPosition="start"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </LoadingButton>
        </div>
      </Box>
    </Container>
  );
}

export default Login;
