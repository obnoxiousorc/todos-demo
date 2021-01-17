import './Todo.css';
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';

function Todo({ name, completed }) {
  return (
    <ListItem class="todo">
      <ListItemText>{name}</ListItemText>
      <ListItemSecondaryAction>
        <Checkbox checked={completed} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
