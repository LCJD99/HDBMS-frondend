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

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


const MyTable = ({rows}) =>{
  return(
      <Table size="l">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell>药品名称</TableCell>
            <TableCell>生产厂商</TableCell>
            <TableCell>剂量</TableCell>
            <TableCell>库存</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.manufacturer}</TableCell>
              <TableCell>{row.dosage}</TableCell>
              <TableCell>{row.inventory}</TableCell>
              {/* <TableCell >{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

  )
}

export default function Orders({rows}) {
  return (
    <React.Fragment>
      <Title>药品信息</Title>
      <Box component="form" onSubmit={()=>{}} noValidate sx={{ mt: 1 }}></Box>
      <Grid container spacing={3}>
      <Grid item>
      <TextField
              margin="normal"
              required
              id="account"
              label="药品名称"
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
      
      </Grid>
      <div >
        <MyTable rows={rows}/>
      </div>
      
    </React.Fragment>
  );
}
