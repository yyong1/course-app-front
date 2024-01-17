import { Carousel } from '../../components/Carousel';
import Adds from './AddsSection/Adds.tsx';
import CourseSection from './CourseSection/CourseSection.tsx';
import Box from '@mui/material/Box';

const coursesData = [
  {
    title: 'The Complete Python Bootcamp From Zero to Hero',
    imageUrl: '/path/to/image-bootcamp.jpg', // Replace with actual image path
    rating: 4.6,
    description:
      'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!',
    price: '$74.99',
    author: 'Jose Portilla',
  },
  {
    title: 'Automate the Boring Stuff with Python Programming',
    imageUrl: '/path/to/image-automate.jpg', // Replace with actual image path
    rating: 4.6,
    description:
      'A practical programming course for office workers, academics, and administrators who want to improve their productivity.',
    price: '$74.99',
    author: 'Al Sweigart',
  },
  {
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    imageUrl: '/path/to/image-100days.jpg', // Replace with actual image path
    rating: 4.7,
    description:
      'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
    price: '$74.99',
    author: 'Dr. Angela Yu',
  },
  {
    title: 'Machine Learning A-Z: Hands-On Python & R In Data Science',
    imageUrl: '/path/to/image-mlaz.jpg', // Replace with actual image path
    rating: 4.6,
    description:
      'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.',
    price: '$74.99',
    author: 'Kirill Eremenko, Hadelin de Ponteves',
  },
  {
    title: 'Python : Master Programming and Development with 15 Projects',
    imageUrl: '/path/to/image-masterpython.jpg', // Replace with actual image path
    rating: 4.3,
    description:
      'Go from beginner to master of Python with 15 hands-on projects. Learn web development, data science, and more.',
    price: '$64.99',
    author: 'Dev Nirwal',
  },
];

function Home() {
  return (
    <>
      <Adds />
      <Box sx={{ flexGrow: 1 }}>
        <CourseSection courses={coursesData} />
      </Box>
      <div>reviews</div>
      <Carousel />
    </>
  );
}

export default Home;
