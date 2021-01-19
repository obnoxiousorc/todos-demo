import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useState } from 'react';
import useAxios from '../hooks/useAxios';

function Todo({ todo, refresh }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [axiosProps, setAxiosProps] = useState({});
  const { loading, axiosError } = useAxios(axiosProps, {
    afterCb: () => {
      setAxiosProps({});
      refresh();
    },
  });

  return (
    <ListItem>
      <ListItemText>{todo.name}</ListItemText>
      <ListItemSecondaryAction>
        <Checkbox
          checked={todo.completed}
          disabled={loading}
          onChange={(e) => {
            setAxiosProps({
              method: 'post',
              url: `todo/${todo.id}/edit`,
              data: {
                completed: e.target.checked,
              },
            });
          }}
        />
        <IconButton
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
