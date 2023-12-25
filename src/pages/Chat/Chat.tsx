import React, { useState } from 'react';
import { Box, TextField, Button, Grid, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../../utils/types/types.ts';
import { UserCell, MessageComponent } from '../../components/ChatComponents';

const initialMessages = [
  { id: 1, text: 'Hi there!', sender: 'bot' },
  { id: 2, text: 'Hello!', sender: 'user' },
  { id: 3, text: 'How can I assist you today?', sender: 'bot' },
];

function Chat() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <List>
          <UserCell
            name="Remy Sharp"
            avatarSrc="/static/images/avatar/1.jpg"
            primaryText="Brunch this weekend?"
            secondaryText="I'll be in your neighborhood doing errands this…"
          />
        </List>
      </Grid>
      <Grid item xs={9}>
        <Box
          sx={{
            height: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'grey.200',
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </Box>
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message"
                  variant="outlined"
                  value={input}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

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

export default Chat;
