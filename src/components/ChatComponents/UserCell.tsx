import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';

interface UserCellProps {
  name: string;
  avatarSrc: string;
  primaryText: string;
  secondaryText: string;
}

const UserCell: React.FC<UserCellProps> = ({ name, avatarSrc, primaryText, secondaryText }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={name} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText
        primary={primaryText}
        secondary={
          <React.Fragment>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {name}
            </Typography>
            {` — ${secondaryText}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default UserCell;
