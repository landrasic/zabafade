import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'


function MainLayout() {
  return (
    <Grid container height='100%' direction='column' className='background'>
      <Grid item xs={1}>
        <NavBar />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
      <Grid item xs={1}>

      </Grid>
    </Grid>

  );
}

export default MainLayout;
