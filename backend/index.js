const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.json());
const authRoutes = require('./authRoutes');
app.use('/api/auth', authRoutes);
app.use(cors());

const verifyToken = require('./verifyToken');
const checkRole = require('./checkRole');

app.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You have access to this protected route!',
    user: req.user
  });
});

app.get('/', (req, res) => {
  res.send('Hello from LMS backend!');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

//check admin
app.post('/api/courses', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Course created!' });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

