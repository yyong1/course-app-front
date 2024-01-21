import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../../utils/types/types.ts';
import { UserCell, MessageComponent, ControlPanel } from '../../components/ChatComponents';
import { WebSocketService } from '../../services';
// eslint-disable-next-line import/no-unresolved
import { IMessage } from '@stomp/stompjs';
import { Autocomplete } from '@mui/joy'; // Ensure you have this import
// import useMessage from '../../hooks/useMessage.ts';

const initialMessages = [
  { id: 1, text: 'Hi there!', sender: 'bot' },
  { id: 2, text: 'Hello!', sender: 'user' },
  { id: 3, text: 'How can I assist you today?', sender: 'bot' },
];

function Chat() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Assuming useMessage is a custom hook for fetching messages
  // const { data: messageData /*, error, isLoading, isError, refetch */ } = useMessage();

  const handleIncomingMessage = (incomingMsg: IMessage) => {
    const msg: Message = {
      id: messages.length + 1,
      text: incomingMsg.body,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  useEffect(() => {
    WebSocketService.connect(handleIncomingMessage);

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() !== '') {
      WebSocketService.sendMessage('/message', input);
      setInput('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // useEffect(() => {
  //   WebSocketService.connect(handleNewChatNotification);
  //
  //   return () => {
  //     WebSocketService.disconnect();
  //   };
  // }, []);
  //
  // const handleNewChatNotification = (notification) => {
  //   // Update your chat list state
  //   // notification might contain chat details
  //   addChatToList(notification.chat);
  // };

  const [openControlPanel, setOpenControlPanel] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Box sx={{ w: 10 }}>
          <ControlPanel open={openControlPanel} setOpen={setOpenControlPanel} />
        </Box>
        {/*</Grid>*/}
        {/*  <Autocomplete*/}
        {/*    options={users}*/}
        {/*    getOptionLabel={(option) => option.name}*/}
        {/*    renderInput={(params) => <TextField {...params} label="Start a chat with" />}*/}
        {/*    onChange={(event, newValue) => {*/}
        {/*      handleCreateChat(newValue);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <TextField fullWidth label="Search for chats" value={searchQuery} onChange={handleSearch} />*/}
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
            {
              // || useMsgQuery
              messages.map((message) => (
                <MessageComponent key={message.id} message={message} />
              ))
            }
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

export default Chat;
