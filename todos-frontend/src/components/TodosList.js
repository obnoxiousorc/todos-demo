import {
  List,
  makeStyles,
  Paper,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Todo from './Todo';

const useStyles = makeStyles((theme) => ({
  mainList: {
    width: '50%',
    margin: 'auto',
  },
}));

function TodosList({ todos }) {
  const styles = useStyles();

  return (
    <Paper className={styles.mainList}>
      <List>
        {todos.length === 0 ? (
          <ListItem>
            <ListItemText>No todos yet!</ListItemText>
          </ListItem>
        ) : (
          todos.map((todo, i) => (
            <>
              <Todo key={i} name={todo.name} completed={todo.completed} />
              {i < todos.length - 1 ? <Divider /> : null}
            </>
          ))
        )}
      </List>
    </Paper>
  );
}

export default TodosList;
