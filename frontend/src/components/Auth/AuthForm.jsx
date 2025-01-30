import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const labelStyle = { mb: 1 };

const AuthForm = () => {
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <Dialog
      slotProps={{
        paper: {
          style: { borderRadius: 30 },
        },
      }}
      open={true}
    >
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography sx={{ mt: 2 }} variant="h4" textAlign={"center"}>
        {isSignUp ? "Sign Up" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          padding={6}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
          margin={"auto"}
          alignContent={"center"}
        >
          {isSignUp && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                sx={{ mb: 1 }}
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={{ mt: 2, mb: 1 }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            sx={{ mb: 1 }}
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={{ mt: 2, mb: 1 }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            sx={{ mb: 4 }}
            variant="standard"
            type={"password"}
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ mt: 2, borderRadius: 10 }}
            fullWidth
          >
            Switch To {isSignUp ? "Login" : "Sign Up"}
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
