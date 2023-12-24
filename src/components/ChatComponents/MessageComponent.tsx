// import Box from '@mui/material/Box';
// import { Paper, Typography } from '@mui/material';
// import React from 'react';
//
// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
// }
//
// const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end',
//         mb: 2,
//       }}
//     >
//       <Paper
//         variant="outlined"
//         sx={{
//           p: 2,
//           backgroundColor: message.sender === 'bot' ? 'primary.light' : 'secondary.light',
//           borderRadius: message.sender === 'bot' ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
//         }}
//       >
//         <Typography variant="body1">{message.text}</Typography>
//       </Paper>
//     </Box>
//   );
// };
// export default MessageComponent;
