import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from '@mui/material';
import CourseCard from './CourseCard.tsx';

function CourseSection({ courses }) {
  return (
    <Grid container spacing={4}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CourseSection;
