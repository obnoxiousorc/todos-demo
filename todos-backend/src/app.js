const express = require('express');
const path = require('path');
const cors = require('cors');

const Todo = require('./db/Todo.js');
const sequelize = require('./db/Database.js');

const port = 7000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/todos', async (req, res) => {
  res.json(await Todo.findAll());
});

app.get('/api/todo/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    res.status(404);
    res.json({ error: 'No such todo!' });
  } else {
    res.json(todo);
  }
});

app.post('/api/todo/:id/edit', async (req, res) => {
  let todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    res.status(404);
    res.json({ error: 'No such todo!' });
  } else {
    await Todo.update(req.body, { where: { id: req.params.id } });
    todo = await Todo.findByPk(req.params.id);
    res.json(todo);
  }
});

app.post('/api/todo/new', async (req, res) => {
  console.log(req.body);
  try {
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
  } catch (error) {
    res.status(500);
    res.json({ error: `Could not create todo: ${error}` });
  }
});

// Look in ./public for anything not matching /api/
app.use(/^\/(?!api\/)/, express.static(path.join(__dirname, 'public')));

async function runServer() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

runServer();
