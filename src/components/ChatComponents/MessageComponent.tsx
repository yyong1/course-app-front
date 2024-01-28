import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Message } from '../../utils/types';
import { useAppSelector } from '../../redux/hooks.ts';

const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  const { id } = useAppSelector((state) => state.auth.userInfo);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.senderId !== id ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: message.senderId !== id ? 'primary.light' : 'secondary.light',
          borderRadius: message.senderId !== id ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
      </Paper>
    </Box>
  );
};
export default MessageComponent;
