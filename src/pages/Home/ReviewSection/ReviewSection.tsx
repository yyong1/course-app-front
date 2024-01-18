import { Box, Typography, Divider } from '@mui/material';
import { Carousel } from '../../../components/Carousel';

function CourseSection() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '2.5rem',
        margin: '0 3.75rem',
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
      }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h4" component="h2" sx={{ minWidth: 0, flexGrow: 1 }}>
          Check out last reviews on our courses
        </Typography>
      </Box>
      <Carousel />
    </Box>
  );
}

export default CourseSection;
