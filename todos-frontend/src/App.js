import './App.css';
import TodosList from './components/TodosList';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';

function App() {
  const [todos, setTodos] = useState([]);
  const { data, loading, error } = useAxios({ url: 'todos' });

  return (
    <div className="App">
      <Typography variant="h4">Todos</Typography>
      {!loading && data ? <TodosList todos={data}></TodosList> : null}
    </div>
  );
}

export default App;
