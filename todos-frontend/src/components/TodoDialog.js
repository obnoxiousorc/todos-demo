import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useState } from 'react';

import useAxios from '../hooks/useAxios';

function TodoDialog({ open, onClose, todo }) {
  const [name, setName] = useState(todo ? todo.name : '');
  const [error, setError] = useState('');
  const [axiosProps, setAxiosProps] = useState({});
  const { loading } = useAxios(axiosProps, {
    successCb: () => onClose(),
    errorCb: (e) => setError(e.message),
    afterCb: () => setAxiosProps({}),
  });

  return (
    <Dialog
      open={open}
      disableBackdropClick
      onEnter={() => {
        setName(todo ? todo.name : '');
      }}
    >
      <DialogTitle>{todo ? 'Edit' : 'Add'} Todo</DialogTitle>
      <DialogContent>
        <TextField
          label="Task"
          variant="outlined"
          error={error}
          helperText={error}
          value={name}
          onChange={(e) => {
            setError('');
            setName(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          enabled={!loading}
          onClick={(e) => {
            if (!name) {
              setError('Please enter a task');
              return;
            }

            setAxiosProps({
              method: 'post',
              url: todo ? `todo/${todo.id}/edit` : 'todo/new',
              data: {
                name,
                completed: todo ? undefined : false,
              },
            });
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoDialog;
