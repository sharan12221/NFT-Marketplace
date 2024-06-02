import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/routes.js'
import bodyParser from 'body-parser';

import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3030;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
});


app.use('/api', routes);


export default app;