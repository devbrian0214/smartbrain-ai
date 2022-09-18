import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './Routes/user.js';

//inital setup
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to SmartBrainAi server');
});
// PORT
const PORT = process.env.PORT || 5000;

// Server Listening
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
