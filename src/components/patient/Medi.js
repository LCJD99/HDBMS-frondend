import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';



export default function Orders({rows}) {
  return (
    <React.Fragment>
      <Title>病例药物信息</Title>
      <Table size="m">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell>日期</TableCell>
            <TableCell>诊断</TableCell>
            <TableCell>药品名称</TableCell>
            <TableCell>药瓶剂量</TableCell>
            <TableCell>厂商</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date.slice(0, 10)}</TableCell>
              <TableCell>{row.instructions}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dosage}</TableCell>
              <TableCell>{row.manufacturer}</TableCell>
              {/* <TableCell >{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}