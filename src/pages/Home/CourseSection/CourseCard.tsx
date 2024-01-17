import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from '@mui/material';

function CourseCard({ course }) {
  return (
    <Card>
      <CardMedia component="img" height="140" image={course.imageUrl} alt={course.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Rating value={course.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Typography variant="h6">{course.price}</Typography>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
