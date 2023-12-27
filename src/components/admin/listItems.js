import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default  ({setMenu}) => {

  return (
  <React.Fragment>
    <ListItemButton onClick={() => setMenu(0)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="主页面" />
    </ListItemButton>
    <ListItemButton onClick={() => setMenu(1)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="患者信息管理" />
    </ListItemButton>
    <ListItemButton onClick={() => setMenu(2)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="医生信息管理"/>
    </ListItemButton>
    <ListItemButton onClick={() => setMenu(3)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="药品信息管理" />
    </ListItemButton>
  </React.Fragment>
)}
