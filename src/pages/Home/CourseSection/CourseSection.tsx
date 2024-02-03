import { Grid, Box, Typography, Divider } from '@mui/material';
import CourseCard from './CourseCard.tsx';

function CourseSection({ courses }) {
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
          A broad selection of courses
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Choose from over 210,000 online video courses with new additions published every month
        </Typography>
        <Divider sx={{ flexGrow: 2 }} />
      </Box>

      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CourseSection;
