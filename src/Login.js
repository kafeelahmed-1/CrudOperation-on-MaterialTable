import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import "./Login.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validationEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validationEmail(email)) {
      isValid = false;
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!validPassword(password)) {
      isValid = false;
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }

    if (isValid) {
      navigate("/CustomizedTables");
    }
  };

  return (

    <div className="container">
      <Container className="form-container" maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 3,
            fontSize: "2rem",
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { marginBottom: 2, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, padding: "10px 20px", fontSize: "16px" }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}
