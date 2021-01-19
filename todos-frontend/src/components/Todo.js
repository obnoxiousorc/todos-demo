import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { useState } from 'react';
import useAxios from '../hooks/useAxios';

function Todo({ todo, refresh }) {
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
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
