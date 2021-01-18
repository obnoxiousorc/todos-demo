import './App.css';
import TodosList from './components/TodosList';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Typography variant="h4">Todos</Typography>
      <TodosList
        todos={[
          { name: 'Do the thing', completed: false },
          { name: 'Win the points', completed: true },
        ]}
      ></TodosList>
    </div>
  );
}

export default App;
