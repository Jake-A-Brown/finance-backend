const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const incomeRoutes = require('./routes/incomeRoutes');
app.use('/api/income', incomeRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expense', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
