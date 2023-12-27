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
      <Title>测试项目信息</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell>日期</TableCell>
            <TableCell>测试类型</TableCell>
            <TableCell>测试结果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id }</TableCell>
              <TableCell>{row.date.slice(0,10)}</TableCell>
              <TableCell>{row.test_type}</TableCell>
              <TableCell>{row.result}</TableCell>
              {/* <TableCell >{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}