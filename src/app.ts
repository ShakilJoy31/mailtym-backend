/**
 * Title: 'Initial Project with professtional Error Handling setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 18-01-2024
 *
 */

import cors from 'cors';
import express, { Application } from 'express';
import router from './app/modules/routes';

const app: Application = express();

app.use(cors());  

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server Working successfully');
});

app.use('/api/v1/', router);

export default app;
