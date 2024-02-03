import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Tooltip, Box } from '@mui/material';

const calculateAverageRating = (ratings) => {
  if (!ratings || !ratings.length) {
    return 0;
  }
  const total = ratings.reduce((acc, curr) => acc + curr, 0);
  return total / ratings.length;
};

function CourseCard({ course }) {
  const averageRating = calculateAverageRating(course.ratings || []);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
      }}
    >
      <CardMedia component="img" height="140" image={course.imageUrl} alt={course.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Tooltip title={course.title} placement="bottom-start" arrow>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {course.title}
          </Typography>
        </Tooltip>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={averageRating} readOnly />
          <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>
            ({course.ratings.length} reviews)
          </Typography>
        </Box>
        <Tooltip title={course.description} placement="bottom-start" arrow>
          <Typography variant="body2" color="text.secondary" noWrap>
            {course.description}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Typography variant="h6">{course.price}</Typography>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
