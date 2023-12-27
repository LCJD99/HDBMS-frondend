import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Typography from '@mui/material/Typography';


export default function Chart({doctor}) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>个人信息</Title>
      <Typography component="p" variant="h6">
        姓名{":   " + doctor.name}
      </Typography>
      <Typography component="p" variant="h6">
        简介{":   " + doctor.contant_info}
      </Typography>

    </React.Fragment>
  );
}