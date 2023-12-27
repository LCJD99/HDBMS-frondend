import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Typography from '@mui/material/Typography';


export default function Chart({patient}) {
  const theme = useTheme();
  console.log(patient[0]);

  return (
    <React.Fragment>
      <Title>个人信息</Title>
      <Typography component="p" variant="h6">
        姓名{":   " + patient.name}
      </Typography>
      <Typography component="p" variant="h6">
        性别{":   " + patient.gender}
      </Typography>
      <Typography component="p" variant="h6">
        出生日期{":   " + patient.birth_date.slice(0, 10)}
      </Typography>
      <Typography component="p" variant="h6">
        病情简介{":  " + patient.contant_info}
      </Typography>

    </React.Fragment>
  );
}