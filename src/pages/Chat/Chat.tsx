import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../../utils/types/types.ts';
import { UserCell, MessageComponent, ControlPanel } from '../../components/ChatComponents';
import { WebSocketService } from '../../services';
// eslint-disable-next-line import/no-unresolved
// import { IMessage } from '@stomp/stompjs';
import { useChatList } from '../../hooks';
import { useAppSelector } from '../../redux/hooks.ts';

const initialMessages = [
  {
    id: '1',
    senderId: 'afadfac-adfad',
    chatId: '2',
    content: 'hello',
    timestamp: '2021-10-10T10:10:10.000Z',
  },
];

// function FixedSizeList(props: {
//   overscanCount: number;
//   width: number;
//   itemSize: number;
//   height: number;
//   itemCount: number;
//   children: ReactNode;
// }) {
//   return null;
// }

function Chat() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  useEffect(() => {
    WebSocketService.connect(
      () => WebSocketService.subscribe('/topic/newChat', handleNewChatNotification),
      (error) => console.error(error),
    );

    return () => {
      WebSocketService.disconnect();
    };
  }, []);
  const {
    data: chatData,
    // error, isLoading, isError, refetch
  } = useChatList(userInfo?.id);
  console.log('useChatList chatData data: ', chatData);

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState<Message[]>([]); // New state for selected chat messages

  const handleChatSelection = (chatId) => {
    setSelectedChat(chatId);
    console.log(selectedChat);
    const selectedChatData = chatData.find((chat) => chat.id === chatId);
    if (selectedChatData) {
      setSelectedChatMessages(selectedChatData.messages || []);
    } else {
      setSelectedChatMessages([]);
    }
  };
  // const handleIncomingMessage = (incomingMsg: Message) => {
  //   if (userInfo?.id && selectedChat) {
  //     const msg: Message = {
  //       id: '',
  //       senderId: userInfo.id,
  //       chatId: selectedChat,
  //       content: input,
  //       timestamp: new Date().toISOString(),
  //     };
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   }
  // };

  const handleNewChatNotification = (chatNotification) => {
    const newChat = JSON.parse(chatNotification.body);
  };

  const handleSend = () => {
    if (input.trim() !== '') {
      WebSocketService.sendMessage('/message', input);
      setInput('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

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
          {chatData?.map((chat) => (
            <UserCell
              key={chat.id}
              name={chat.messages && chat.messages.length > 0 ? chat.messages[0].text : 'No messages yet'}
              avatarSrc="/static/images/avatar/1.jpg"
              primaryText={chat.chatName}
              secondaryText={chat.messages && chat.messages.length > 0 ? chat.messages[0].text : 'No messages yet'}
              onClick={() => handleChatSelection(chat.id)}
              selected={selectedChat === chat.id} // Pass selected state
            />
          ))}
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

export default Chat;
