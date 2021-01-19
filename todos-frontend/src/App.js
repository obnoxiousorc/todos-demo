import './App.css';
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';
import { Add } from '@material-ui/icons';
import TodoDialog from './components/TodoDialog';
import Todo from './components/Todo';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function App() {
  const styles = useStyles();
  // Used to force an update
  const [filterSelectValue, setFilterSelectValue] = useState('all');
  const [dataVersion, setDataVersion] = useState(0);
  const [newTodoDialogOpen, setNewTodoDialogOpen] = useState(false);
  const { data, loading, error } = useAxios({
    url: 'todos',
    version: dataVersion,
  });

  let todos;
  if (data) {
    if (filterSelectValue === 'uncompleted') {
      todos = data.filter((todo) => !todo.completed);
    } else if (filterSelectValue === 'completed') {
      todos = data.filter((todo) => todo.completed);
    } else {
      todos = data;
    }
  }

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
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel id="filterLabel">Filter</InputLabel>
              <Select
                labelId="filterLabel"
                id="filterSelect"
                value={filterSelectValue}
                onChange={(e) => setFilterSelectValue(e.target.value)}
                label="Filter"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="uncompleted">Uncompleted</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Paper>
              <List style={{ maxHeight: '60vh', overflow: 'auto' }}>
                {!todos || todos.length === 0 ? (
                  <ListItem>
                    <ListItemText>No todos yet!</ListItemText>
                  </ListItem>
                ) : (
                  todos.map((todo, i) => (
                    <>
                      <Todo
                        key={i}
                        todo={todo}
                        refresh={() => setDataVersion(dataVersion + 1)}
                      />
                      {i < todos.length - 1 ? <Divider /> : null}
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
