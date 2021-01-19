import './App.css';
import TodosList from './components/TodosList';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';
import { Add } from '@material-ui/icons';
import TodoDialog from './components/TodoDialog';

function App() {
  const [dataVersion, setDataVersion] = useState(0);
  const [newTodoDialogOpen, setNewTodoDialogOpen] = useState(false);
  const { data, loading, error } = useAxios({
    url: 'todos',
    version: dataVersion,
  });

  return (
    <div className="App">
      <Container>
        <Grid
          container
          spacing={3}
          style={{ height: '100%' }}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">Todos</Typography>
          </Grid>
          <Grid item>
            {!loading && data ? <TodosList todos={data}></TodosList> : null}
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setNewTodoDialogOpen(true)}
            >
              Add todo
            </Button>
          </Grid>
          <TodoDialog
            type="new"
            open={newTodoDialogOpen}
            onClose={() => {
              setNewTodoDialogOpen(false);
              setDataVersion(dataVersion + 1);
            }}
          />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
