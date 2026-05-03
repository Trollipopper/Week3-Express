import express from 'express';
import cors from 'cors';
import catsRouter from './api/routes/cats.js';
import usersRouter from './api/routes/users.js';
import authRouter from './api/routes/auth-router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1/cats', catsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

export default app;
