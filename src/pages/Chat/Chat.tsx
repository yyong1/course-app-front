import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { UserCell, MessageComponent, ControlPanel, NoMessagesYetComponent } from '../../components/ChatComponents';
import { WebSocketService, TimestampFormatter } from '../../services';
import { useChatList } from '../../hooks';
import { useAppSelector } from '../../redux/hooks.ts';
import { Chat, Message } from '../../utils/types';
import ToastService from '../../services/toastify/ToastService.ts';

function Chat() {
  const [input, setInput] = useState<string>('');
  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState<Message[] | null>([]);

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const {
    data: chatData,
    refetch,
    // error, isLoading, isError, refetch
  } = useChatList(userInfo?.id);
  console.log('useChatList chatData data: ', chatData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleChatSelection = (chatId: string) => {
    setSelectedChat(chatId);
    const selectedChatData = chatData?.find((chat: Chat): boolean => chat.id === chatId);
    setSelectedChatMessages(selectedChatData?.messages || []);
  };

  const handleSend = () => {
    if (input.trim() !== '' && selectedChat) {
      const timestamp = TimestampFormatter(new Date());

      const messageToSend: { senderId: string; chatId: string; content: string; timestamp: string } = {
        senderId: userInfo.id,
        chatId: selectedChat,
        content: input,
        timestamp: timestamp,
      };
      console.log('messageToSend:', messageToSend);

      WebSocketService.sendMessage('/app/chat/message', JSON.stringify(messageToSend));

      setSelectedChatMessages((prevMessages) => [
        ...(prevMessages || []),
        { ...messageToSend, id: 'optimistic-' + Date.now() },
      ]);

      setInput('');
    }
  };

  const addNewChat = useCallback(
    (chatNotification) => {
      const newChat = JSON.parse(chatNotification.body);
      ToastService.success(`You've been added to chat - ${newChat.chatName}.`);
      console.log('addNewChat: ', newChat);
      refetch().then((r) => console.log('refetch() result: ', r));
    },
    [refetch],
  );

  const addNewMessage = useCallback(
    (messageNotification: { body: string }): void => {
      const newMessage = JSON.parse(messageNotification.body);
      setSelectedChatMessages((prevMessages: Message[] | null) => {
        if (selectedChat === newMessage.chatId) {
          return [...(prevMessages || []), newMessage];
        }
        return prevMessages;
      });
      ToastService.success(`New message from ${newMessage.senderId} received.`);
      console.log('addNewMessage: ', newMessage);
    },
    [selectedChat],
  );
  
  useEffect(() => {
    if (chatData && chatData.length > 0) {
      const firstChatId = chatData[0].id;
      handleChatSelection(firstChatId);
    }
  }, [chatData]);

  useEffect(() => {
    let reconnectInterval;

    const connectWebSocket = async () => {
      try {
        await WebSocketService.connect();
        // sub to the new chats where were added user
        const newChatTopic = `/topic/new-chat/${userInfo.id}`;
        WebSocketService.subscribe(newChatTopic, (messageNotification): void => {
          addNewChat(messageNotification);
        });
        // sub for each chat
        chatData?.forEach((chat: Chat): void => {
          const chatTopic: string = `/topic/chat/${chat.id}`;
          WebSocketService.subscribe(chatTopic, (notification): void => {
            addNewMessage(notification);
          });
        });

        console.log('WebSocket subscriptions set up successfully.');
      } catch (error) {
        console.error('WebSocket connection error:', error);
        reconnectInterval = setInterval(() => {
          WebSocketService.connect().catch(console.error);
        }, 5000);
      }
    };

    connectWebSocket().then((r) => console.log('connectWebSocket() result: ', r));

    return () => {
      clearInterval(reconnectInterval);
      WebSocketService.disconnect();
      console.log('WebSocket disconnected.');
    };
  }, [addNewChat, addNewMessage, chatData, userInfo.id]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Box sx={{ w: 10 }}>
          <ControlPanel open={openControlPanel} setOpen={setOpenControlPanel} />
        </Box>
        <List sx={{ height: 'auto', overflow: 'auto', p: 0 }}>
          {chatData?.map((chat) => (
            <UserCell
              key={chat.id}
              name={
                chat.messages && chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].content
                  : 'No messages yet'
              }
              avatarSrc="/static/images/avatar/1.jpg"
              primaryText={chat.chatName}
              secondaryText={
                chat.messages && chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].content
                  : 'No messages yet'
              }
              onClick={() => handleChatSelection(chat.id)}
              selected={selectedChat === chat.id}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh', bgcolor: 'grey.200' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {selectedChatMessages?.length > 0 ? (
              selectedChatMessages?.map((message) => <MessageComponent key={message.id} message={message} />)
            ) : (
              <NoMessagesYetComponent />
            )}
          </Box>
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
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
