import loginService from '../services/login'
import SignIn from '../components/SignIn'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { log } from 'console'
import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as Links,
  Redirect,
  useParams,
  useNavigate,
} from "react-router-dom"


const Login = ({
  handleSubmit,
}) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  //登陆表单处理逻辑
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        'role' : 'admin',
        'account': 'a001',
        'password': '123456'
      })
      console.log(user)
      //noteService.setToken(user.token)
      // window.localStorage.setItem(
      //   'loggedNoteappUser', JSON.stringify(user)
      // )
      // setUser(user)
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      //log('exception', exception);
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const test = async () => {
    await loginService.login({
      'role' : 'admin',
      'account': 'a001',
      'password': '123456'
    }).then(
      (data) => {
        console.log(data.length)
      }
    )
  }
  return (
    <ThemeProvider >
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login