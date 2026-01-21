import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {Stack,TextField,IconButton,InputAdornment,Button,Snackbar,Alert, CircularProgress} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signuppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setToastMsg("Please select an image!");
      setOpen(true);
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatstream");

      fetch("https://api.cloudinary.com/v1_1/dhmbld7ho/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setToastMsg("Image upload failed");
          setOpen(true);
          setLoading(false);
        });
    } else {
      setToastMsg("Please select a JPEG or PNG image!");
      setOpen(true);
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
  if (!name || !email || !password || !confirmpassword) {
    setToastMsg("Please fill all the fields");
    setOpen(true);
    return;
  }

  if (password !== confirmpassword) {
    setToastMsg("Passwords do not match");
    setOpen(true);
    return;
  }

  try {
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user/register",{ name, email, password, pic },config);
    setToastMsg("Registration Successful");

    localStorage.setItem("userInfo", JSON.stringify(data));              // Storing user info in local storage
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    console.error(error.response?.data || error.message);
    setToastMsg(error.response?.data?.message || "Error occurred during signup");
    setOpen(true);
    setLoading(false);
  }
};

  return (
    <>
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
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="outlined" component="label">
          Upload your Pic
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
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24}/> : "Sign Up"}
        </Button>
      </Stack>

      {/* ✅ Material-UI Snackbar (Toast replacement) */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signuppage;
