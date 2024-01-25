import { Box, Grid, Typography } from '@mui/material';

function NoMessagesYetComponent() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Typography>No messages yet</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NoMessagesYetComponent;
