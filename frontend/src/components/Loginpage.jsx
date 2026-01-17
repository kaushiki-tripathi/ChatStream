import React from 'react'
import {Stack,TextField,IconButton,InputAdornment,Button} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Loginpage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

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
    
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={SubmitHandler}
          >
            Login 
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={()=>{
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Get Guest User Credentials 
          </Button>
        </Stack>
  )
}

export default Loginpage
