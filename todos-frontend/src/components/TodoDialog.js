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

function TodoDialog({ open, onClose, id }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [axiosProps, setAxiosProps] = useState({});
  const { loading, axiosError } = useAxios(axiosProps, {
    successCb: () => onClose(),
    errorCb: (e) => setError(e.message),
    afterCb: () => setAxiosProps({}),
  });

  console.log(axiosProps);

  return (
    <Dialog open={open} disableBackdropClick>
      <DialogTitle>{id ? 'Edit' : 'Add'} Todo</DialogTitle>
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
        <Button variant="contained" onClick={onClose}>
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
              url: id ? `todo/${id}/edit` : 'todo/new',
              data: {
                name,
                completed: id ? undefined : false,
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
