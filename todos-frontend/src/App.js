import './App.css';
import { List } from '@material-ui/core';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <h1>Todos</h1>
      <List>
        {[
          { name: 'Do the thing', completed: false },
          { name: 'Win the points', completed: true },
        ].map((item) => (
          <Todo name={item.name} completed={item.completed} />
        ))}
      </List>
    </div>
  );
}

export default App;
