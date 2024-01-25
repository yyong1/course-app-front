import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';

interface UserCellProps {
  name: string;
  avatarSrc: string;
  primaryText: string;
  secondaryText: string;
  onClick: () => void;
  selected: boolean;
}

const UserCell: React.FC<UserCellProps & { onClick: () => void }> = ({
  name,
  avatarSrc,
  primaryText,
  secondaryText,
  onClick,
  selected,
}) => {
  return (
    <>
      <ListItem alignItems="flex-start" onClick={onClick} sx={{ backgroundColor: selected ? 'lightgrey' : 'inherit' }}>
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
      <Divider variant="inset" component="li" />
    </>
  );
};

export default UserCell;
