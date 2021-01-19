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
import TodoDialog from './TodoDialog';

function Todo({ todo, refresh }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [axiosProps, setAxiosProps] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { loading, axiosError } = useAxios(axiosProps, {
    afterCb: () => {
      setMenuAnchor(null);
      setAxiosProps({});
      refresh();
    },
  });

  return (
    <>
      <ListItem>
        <ListItemText
          style={
            todo.completed
              ? {
                  textDecoration: 'line-through',
                  color: 'grey',
                  fontStyle: 'italic',
                }
              : null
          }
        >
          {todo.name}
        </ListItemText>
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
            <MenuItem
              onClick={() => {
                setMenuAnchor(null);
                setEditDialogOpen(true);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAxiosProps({
                  method: 'delete',
                  url: `todo/${todo.id}`,
                });
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <TodoDialog
        open={editDialogOpen}
        todo={todo}
        onClose={() => {
          setEditDialogOpen(false);
          refresh();
        }}
      />
    </>
  );
}

export default Todo;
