import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//inital setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

// PORT
const PORT = process.env.PORT || 5000;

// Server Listening
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
