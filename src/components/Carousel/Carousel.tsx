import { useState, useEffect, ReactElement } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Card from './Card.tsx';

function Carousel() {
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const cardsPerPage: number = 3;
  const duplicateCards: ReactElement[] = Array.from({ length: 10 }, (_, i) => <Card key={i} />);

  const handleNext = () => {
    setSlideDirection('left');
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setSlideDirection('right');
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCards(duplicateCards);
  }, []);

  let containerWidth;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '100%',
        marginTop: '40px',
      }}
    >
      <IconButton onClick={handlePrev} sx={{ margin: 5 }} disabled={currentPage === 0}>
        {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
        <NavigateBeforeIcon />
      </IconButton>
      <Box sx={{ width: `${containerWidth}px`, height: '100%' }}>
        {/* this is the box that holds the cards and the slide animation,
        in this implementation the card is already constructed but in later versions you will see how the
        items you wish to use will be dynamically created with the map method*/}
        {cards.map((card, index) => (
          <Box
            key={`card-${index}`}
            sx={{
              width: '100%',
              height: '100%',
              display: currentPage === index ? 'block' : 'none',
            }}
          >
            {/* this is the slide animation that will be used to slide the cards in and out*/}
            <Slide direction={slideDirection} in={currentPage === index}>
              <Stack
                spacing={2}
                direction="row"
                alignContent="center"
                justifyContent="center"
                sx={{ width: '100%', height: '100%' }}
              >
                {/* this slices the cards array to only display the amount you have previously determined per page*/}
                {cards.slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage)}
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={handleNext}
        sx={{
          margin: 5,
        }}
        disabled={currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default Carousel;
