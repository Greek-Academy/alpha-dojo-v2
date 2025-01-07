import { lintRouter } from './router/lintRouter';
import * as express from 'express';
import cors = require('cors');

const app = express();
const port = parseInt(process.env.LINTER_PORT as string, 10) || 8080;
// const port = parseInt(process.env.PORT as string, 10) || 8080;

app.use(
  cors({
    origin: ['http://localhost:3002', 'https://alphadojo.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/lint', lintRouter);
app.listen(port, '0.0.0.0', 10, () => {
  console.log(`Server runs on port ${port}`);
});
