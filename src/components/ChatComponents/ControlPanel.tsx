import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SelectUserDropList from './SelectUserDropList.tsx';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { User } from '../../utils/types/types.ts';
import { ChatService, WebSocketService } from '../../services';
import ToastService from '../../services/toastify/ToastService.ts';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ControlPanelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ControlPanel({ setOpen, open }: ControlPanelProps) {
  const [chatName, setChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleCreateChat = async (): Promise<void> => {
    try {
      const newChatData: { chatName: string; userIds: string[] } = {
        chatName: chatName,
        userIds: selectedUsers.map((user) => user.id),
      };
      console.log('New chat data:', newChatData);
      const newChat = await ChatService.setNewChat(newChatData);
      console.log('New chat created:', newChat);
      handleClose();
      ToastService.success(`New chat ${newChatData.chatName} created successfully.`);
      if (WebSocketService.isConnected()) {
        WebSocketService.sendMessage('/topic/newChat', JSON.stringify(newChat));
      } else {
        console.error('WebSocket connection is not active.');
      }
    } catch (error) {
      console.error('Error while creating chat:', error);
    }
  };

  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" my={1}>
        <Button variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>
          Create new chat
        </Button>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New chat creation
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container direction="column" alignItems="center">
            <Typography>Select the users you want to add to the chat:</Typography>
            <SelectUserDropList setSelectedUsers={setSelectedUsers} />
            <Typography>Select chat name:</Typography>
            <TextField
              id="outlined-basic"
              label="Chat name"
              variant="outlined"
              value={chatName}
              onChange={handleChatNameChange}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateChat}>Create new Chat</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ControlPanel;
