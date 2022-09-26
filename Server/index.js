import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Router
import userRouter from './Routes/user.js';
import profileRouter from './Routes/profile.js';
import imageRouter from './Routes/image.js';

//inital setup
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/imageURL', imageRouter);

app.get('/', (req, res) => {
  res.send('Welcome to SmartBrainAi server');
});

// PORT
const PORT = process.env.PORT || 4000;

// Server Listening
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
