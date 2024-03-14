import { Container, Typography } from '@mui/material'
import React from 'react'

function PageNotFound() {
  return (
    <Container sx={{ textAlign: 'center', marginTop: '20vh' }}>
        <Typography variant="h1">Page Not Found</Typography>

        <Typography variant="h2">404</Typography>
    </Container>
  )
}

export default PageNotFound