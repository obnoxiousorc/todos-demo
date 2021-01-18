import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

function Todo({ name, completed }) {
  return (
    <ListItem>
      <ListItemText>{name}</ListItemText>
      <ListItemSecondaryAction>
        <Checkbox checked={completed} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
