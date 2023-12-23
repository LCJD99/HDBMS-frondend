import { useState, useEffect, useRef } from 'react'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as Links,
  Redirect,
  useParams,
  useNavigate,
} from "react-router-dom"
import loginService from '../services/login'



const defaultTheme = createTheme();

export default function SignIn({ changeState }) {
  const navigate = useNavigate()
  const [Data, setData] = useState({
    "account": "",
    "password": "",
    "role": ""
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setData({
      "account": data.get("account"),
      "password": data.get("password"),
      "role": data.get("role"),
    },() =>{
      console.log({
        Data,
      });

    })

    try {
      loginService.login(Data).then((user) => {
        if (user.length < 1) {
          console.log("error")
          setData({
            "account": "",
            "password": "",
            "role": ""
          })
        } else {
          console.log("user:", user[0]);
          changeState({
            "Id": user[0].id,
            "role": Data.role,
            "isLogin": true
          })
          navigate('/'+Data.role);

        }

      })

      // setData({
      //   "account": "",
      //   "password": "",
      //   "role": ""
      // })
    } catch (exception) {
      console.log("exception", exception);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            医院管理系统
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="用户名"
              name="account"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
            />
            <TextField
              select
              defaultValue={"patient"}
              margin="normal"
              required
              name="role"
              fullWidth
              label="身份"
              id="role"
            >
              <MenuItem value="admin">管理员</MenuItem>
              <MenuItem value="doctor">医生</MenuItem>
              <MenuItem value="patient">患者</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}