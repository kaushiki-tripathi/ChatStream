import React, { useState } from "react";
import {Stack,TextField,IconButton,InputAdornment,Button} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signuppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState(null);

  const postDetails = (file) => {
    setPic(file);
  };

  const SubmitHandler = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="Name"
        required
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        required
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        required
        fullWidth
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        required
        fullWidth
        type={showPassword ? "text" : "password"}
        value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="outlined" component="label">
        Upload your Picture
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </Button>

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        onClick={SubmitHandler}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default Signuppage;
