import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Title from './Title';
import Box from '@mui/material/Box';
import {useState} from  'react'

import Addform from './Addform';


const MyTable = ({rows}) =>{
  console.log(rows);
  return(
      <Table size="l">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>出生日期</TableCell>
            <TableCell>基本信息</TableCell>
            <TableCell>余额</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.birth_date}</TableCell>
              <TableCell>{row.contant_info}</TableCell>
              <TableCell >{`¥${row.balance}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

  )
}

export default function Orders({rows}) {
  const [state, setState] = useState(false)
  const toggleState = () => {
    setState(!state)
  }
  const hideWhenVisible = { display: state? 'none' : '' }
  const showWhenVisible = { display: state? '' : 'none' }


  return (
    <React.Fragment>
      <Title>{state ? "开据处方" : "患者信息"}</Title>
      <Box component="form" onSubmit={()=>{}} noValidate sx={{ mt: 1 }}></Box>
      <Grid container spacing={3}>
      <Grid item>
      <TextField
              margin="normal"
              required
              id="account"
              label="患者姓名"
              name="account"
              autoFocus
              size = 'small'
        />
      </Grid>
      <Grid>
      <Button
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 2 , ml: 5}}
        >
          查找
        </Button>
      </Grid>

      <Grid>
      <Button
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 2 , ml: 5}}
          onClick={toggleState}
        >
          {state ? "查看列表" : "开处方"}
        </Button>
      </Grid>
      
      </Grid>
      <div style={hideWhenVisible}>
        <MyTable rows={rows}/>
      </div>
      <div style={showWhenVisible}>
        <Addform/>
      </div>
      
    </React.Fragment>
  );
}