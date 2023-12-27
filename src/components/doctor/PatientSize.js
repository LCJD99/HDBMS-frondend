import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
function preventDefault(event) {
  event.preventDefault();
}

export default ({Id}) => {
  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
    }
  return (
    <React.Fragment>
      <Title>患者数量</Title>
      <Typography component="p" variant="h4">
        {Id}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {getDate()}
      </Typography>
    </React.Fragment>
  );
}