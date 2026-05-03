import express from 'express';
import catsRouter from './api/routes/cats.js';
import usersRouter from './api/routes/users.js';

const app = express();

app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1/cats', catsRouter);
app.use('/api/v1/users', usersRouter);

export default app;
