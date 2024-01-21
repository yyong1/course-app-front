// eslint-disable-next-line import/named
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// eslint-disable-next-line import/named
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { useUsers } from '../../hooks';
import { User } from '../../utils/types/types.ts';
import { useAppSelector } from '../../redux/hooks.ts';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(userId: string, selectedUserIds: string[], theme: Theme) {
  return {
    fontWeight: selectedUserIds.includes(userId)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface SelectUserDropListProps {
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

function SelectUserDropList({ setSelectedUsers }: SelectUserDropListProps) {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  console.log('userInfo:', userInfo);
  const { data: queryUsers, isLoading, isError } = useUsers(); // Use the hook to fetch users
  const theme = useTheme();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([userInfo.id]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // Ensure the clientId is always included and not removable
    let newSelectedUserIds = typeof value === 'string' ? value.split(',') : value;
    if (!newSelectedUserIds.includes(userInfo.id)) {
      newSelectedUserIds = [...newSelectedUserIds, userInfo.id];
    }
    setSelectedUserIds(newSelectedUserIds);
    setSelectedUsers(queryUsers?.filter((user) => newSelectedUserIds.includes(user.id)) ?? []);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Users</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedUserIds}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {queryUsers?.map((user) => (
            <MenuItem key={user.id} value={user.id} style={getStyles(user.id, selectedUserIds, theme)}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectUserDropList;
