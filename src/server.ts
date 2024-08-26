import { env } from './env';
import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes';

const app = express();
const port = env.PORT || '8081';

app.use(bodyParser.json());
app.use('/', postRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
