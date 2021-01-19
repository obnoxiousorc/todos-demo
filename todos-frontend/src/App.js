import './App.css';
import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';
import { Add } from '@material-ui/icons';
import TodoDialog from './components/TodoDialog';
import Todo from './components/Todo';

function App() {
  // Used to force an update
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
          style={{ maxHeight: '100vh' }}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">Todos</Typography>
          </Grid>
          <Grid item>
            <Paper>
              <List style={{ maxHeight: '60vh', overflow: 'auto' }}>
                {!data || data.length === 0 ? (
                  <ListItem>
                    <ListItemText>No todos yet!</ListItemText>
                  </ListItem>
                ) : (
                  data.map((todo, i) => (
                    <>
                      <Todo
                        key={i}
                        todo={todo}
                        refresh={() => setDataVersion(dataVersion + 1)}
                      />
                      {i < data.length - 1 ? <Divider /> : null}
                    </>
                  ))
                )}
              </List>
            </Paper>
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
