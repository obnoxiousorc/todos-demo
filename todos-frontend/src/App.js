import './App.css';
import TodosList from './components/TodosList';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';
import { Add } from '@material-ui/icons';

function App() {
  const { data, loading, error } = useAxios({ url: 'todos' });

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
            >
              Add todo
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
