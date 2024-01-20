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
import { Grid } from '@mui/material';
import { useState } from 'react';

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
  setOpen: (open: boolean) => void;
}

function ControlPanel({ setOpen, open }: ControlPanelProps) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [chatName, setChatName] = useState<string>(''); // State for the chat name
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // State for selected user IDs

  const handleCreateChat = () => {
    const newChatData = {
      chatName: chatName,
      userIds: selectedUsers,
    };
    console.log('newChatData', newChatData);
    // fetch('/api/chats', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Include other headers as needed, e.g., for authorization
    //   },
    //   body: JSON.stringify(newChatData),
    // })
  };
  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>
        Create new chat
      </Button>
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
